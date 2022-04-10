import {
  DynamicModule,
  ModuleMetadata,
  Type,
  ValueProvider,
} from '@nestjs/common/interfaces';
import { BaseEntity } from '../base/base.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SafeDictionary } from 'ts-essentials';

interface RepositoryServiceSpec<T> {
  repository: Type<T>;
}

interface ObjectProviderSpec<T> {
  token: symbol | string;
  object: T;
}

type TestServiceSpec =
  | Type<any>
  | RepositoryServiceSpec<any>
  | ObjectProviderSpec<any>;

export interface TestServicesSpec {
  [serviceName: string]: TestServiceSpec;
}

export type TestServices<Spec extends TestServicesSpec> = {
  [name in keyof Spec]: Spec[name] extends Type<infer PlainServiceType>
    ? PlainServiceType
    : Spec[name] extends ObjectProviderSpec<infer ObjectProviderType>
    ? ObjectProviderType
    : Spec[name] extends { repository: Type<infer EntityType> }
    ? Repository<EntityType>
    : never;
} & {
  _module: TestingModule;
};

export function generateObject<T>(
  keys: (keyof T)[],
  valueGenFn: <K extends keyof T>(key: K, index: number) => T[K],
  baseResultObj: Partial<T> = {},
): Partial<T> {
  return keys.reduce((acc, key, index) => {
    acc[key] = valueGenFn(key, index);
    return acc;
  }, baseResultObj) as T;
}

// Needed to be put into `providers` for `Test.createTestingModule` for each
// typeOrm repository that the module depends on, even indirectly or if not used.
// Otherwise nestjs can't resolve dependencies for the built module.
export function mockRepositoryProvider<T extends BaseEntity>(
  entity: Type<T>,
): ValueProvider {
  const mkFailFn: (name: string) => () => never = (name: string) => () => {
    throw new Error('err');
  };
  const mockRepo = generateObject<Repository<T>>(
    [
      'find',
      'findOne',
      'findOneOrFail',
      'save',
      'delete',
      'remove',
      'update',
      'createQueryBuilder',
    ],
    (methodName) =>
      mkFailFn(methodName) as unknown as Repository<T>[typeof methodName],
    {
      // NOTE: this is weaker than typeorm's create (doesn't support DeepPartial)
      create: (props: Partial<T>) => Object.assign(new entity(), props),
    } as Repository<T>,
  );
  return {
    provide: getRepositoryToken(entity),
    useValue: mockRepo,
  };
}

export const initialDynamicConfigEntriesDiToken = Symbol(
  'initialDynamicConfigEntries',
);

function prepareProviderOverrides(
  mockEntityRepositories: Type<BaseEntity>[],
  overrideProviders: ValueProvider[],
): ValueProvider[] {
  const allProviderOverrides = [
    ...mockEntityRepositories.map(mockRepositoryProvider),
    ...overrideProviders,
  ];
  // Override the initial config provider for all tests, to avoid doing it every time the
  // DynamicConfig service is in the tested service's deps. This is a rare custom case, because
  // this provider does a repository call during module bootstrap (see its comment).
  if (
    !overrideProviders.some(
      ({ provide }) => provide === initialDynamicConfigEntriesDiToken,
    )
  ) {
    allProviderOverrides.push({
      provide: initialDynamicConfigEntriesDiToken,
      useValue: [],
    });
  }
  return allProviderOverrides;
}

function onceMockLoggingEnabled(): boolean {
  return false;
}

export type AnyObject = SafeDictionary<any>;

interface OnceMockChecks<
  ObjT extends AnyObject,
  MethodT extends jest.FunctionPropertyNames<ObjT>,
  ArgsT extends any[],
> {
  spy: jest.MockInstance<ObjT[MethodT], ArgsT>;
  object: ObjT;
  method: MethodT;
  expectedNthCallArgs: any[][] | '__NEVER_CALLED' | '__ANY';
}

let onceMocksByObjectByMethod: Map<
  any,
  SafeDictionary<OnceMockChecks<any, any, any[]>>
> = new Map();
let onceMocksSetUp = false;

function onceMockName(
  obj: any,
  method: jest.FunctionPropertyNames<typeof obj>,
): string {
  return `${obj.constructor.name}::${method.toString()}`;
}

function verifyOnceMockCalls<
  T extends AnyObject,
  M extends jest.FunctionPropertyNames<T>,
  A extends any[],
>({ spy, object, method, expectedNthCallArgs }: OnceMockChecks<T, M, A>): void {
  const spyCallCount = spy.mock.calls.length;
  const mockName = onceMockName(object, method);

  console.log(verifyOnceMockCalls, `verifying once mocks for ${mockName}`);

  if (expectedNthCallArgs === '__NEVER_CALLED') {
    // Check the call count to make sure the mocked exception was not caught & ignored
    expect(spyCallCount).toEqual(0);
    return;
  }
  if (expectedNthCallArgs === '__ANY') {
    return;
  }

  // NOTE: checking the call count right away would just fail the test with "invalid call count";
  // instead we're checking the available calls first, to make debugging easier.
  const spyExpectedCalls = expectedNthCallArgs.length;

  expectedNthCallArgs.forEach((expectedArgs: unknown[], callIdx) => {
    const callNum = callIdx + 1; // jest spy methods (and some humans) index calls from 1
    const callExpectMsg = `mock*Once for ${mockName} [call ${callNum}/${spyExpectedCalls}]`;
    expect(spyCallCount).toBeGreaterThanOrEqual(callNum);
    expect(spy).toHaveBeenNthCalledWith(callNum, ...expectedArgs);
  });

  expect(spyCallCount).toEqual(spyExpectedCalls);
}

/**
 * This needs to be called before all tests using `mockPromiseOnce` or `mockValueOnce`,
 * but both those function will throw with a clear error message if this is not called before.
 */
export function setupOnceMocks(): void {
  afterEach(() => {
    try {
      console.log(setupOnceMocks, 'test finished, verifying once mocks');
      onceMocksByObjectByMethod.forEach((onceMocksByMethod) =>
        Object.values(onceMocksByMethod).forEach((mocks) =>
          verifyOnceMockCalls(mocks!),
        ),
      );
    } finally {
      // NOTE: the once mocks need to be always cleared, even if the expectations failed,
      // to avoid breaking any following tests
      console.log(setupOnceMocks, 'restoring once mock methods');
      onceMocksByObjectByMethod.forEach((onceMocksByMethod) =>
        Object.values(onceMocksByMethod).forEach((mocks) =>
          mocks!.spy.mockRestore(),
        ),
      );
      onceMocksByObjectByMethod = new Map();
    }
  });

  console.log(setupOnceMocks, 'once mocks set up');
  onceMocksSetUp = true;
}

// The simplest way to create a module for unit testing is to import it, overriding
// any "external" providers, in particular the TypeOrm repositories.
// @see https://github.com/nestjs/nest/issues/363#issuecomment-443178005
// The global config module is normally only imported in the root module, hence must be added
// manually.
export async function baseCreateTestingModule(
  module: Type<any> | ModuleMetadata,
  globalModules: (Type<any> | DynamicModule)[],
  overrideProviders: ValueProvider[] = [],
): Promise<TestingModule> {
  const moduleMetadata =
    module instanceof Function
      ? { imports: [module, ...globalModules] }
      : {
          ...module,
          imports: [...(module.imports ?? []), ...globalModules],
        };
  let moduleBuilder = Test.createTestingModule(moduleMetadata);
  // NOTE: we can extend provider types to ClassProvider and FactoryProvider if we need it
  overrideProviders.forEach((provider) => {
    moduleBuilder = moduleBuilder
      .overrideProvider(provider.provide)
      .useValue(provider.useValue);
  });
  return moduleBuilder.compile();
}

export function checkType<AssertedType>(
  _value: any,
  condition: boolean,
): _value is AssertedType {
  return condition;
}

export function arraysShallowEqual<T>(arr1: T[], arr2: T[]): boolean {
  return (
    arr1.length === arr2.length && arr1.every((elem, idx) => arr2[idx] === elem)
  );
}

/**
 * A helper for creating a testing module and extracting some of its services.
 *
 * With this function, you don't have to separately declare services that will be used in tests,
 * and later almost rewrite the declarations when retrieving the test modules. The returned object
 * will contain the services requested in the passed @see TestServicesSpec plus a `_module` property
 * with the built testing module, in case it's needed for any custom logic.
 *
 * NOTE: while this functions returns a typed object, it does so only for convenience. The object
 * is actually constructed in a `beforeAll` hook, so its values are only available inside other
 * jest's test closures.
 */
export function basePrepareTestServices<Spec extends TestServicesSpec>(
  module: Type<any> | ModuleMetadata,
  globalModules: (Type<any> | DynamicModule)[],
  overrideProviders: ValueProvider[],
  serviceSpec: Spec,
): TestServices<Spec> {
  setupOnceMocks(); // used in most test suites, no harm to be ran in others
  const ts: TestServices<Spec> = {} as any;
  beforeAll(async () => {
    ts._module = await baseCreateTestingModule(
      module,
      globalModules,
      overrideProviders,
    );
    Object.entries(serviceSpec).forEach(([serviceName, serviceDesc]) => {
      if (
        checkType<ObjectProviderSpec<any>>(
          serviceDesc,
          arraysShallowEqual(Object.keys(serviceDesc), ['token', 'object']),
        )
      ) {
        const serviceToken = serviceDesc.token;
        ts[serviceName as keyof Spec] = ts._module.get(serviceToken);
      } else if (
        checkType<RepositoryServiceSpec<any>>(
          serviceDesc,
          arraysShallowEqual(Object.keys(serviceDesc), ['repository']),
        )
      ) {
        const entityType = serviceDesc.repository;
        ts[serviceName as keyof Spec] = ts._module.get(
          getRepositoryToken(entityType),
        );
      } else {
        ts[serviceName as keyof Spec] = ts._module.get(serviceDesc);
      }
    });
  });
  return ts;
}

export function prepareTestServices<Spec extends TestServicesSpec>(
  module: Type<any> | ModuleMetadata,
  mockEntityRepositories: Type<BaseEntity>[],
  overrideProviders: ValueProvider[],
  serviceSpec: Spec,
): TestServices<Spec> {
  return basePrepareTestServices(
    module,
    [],
    prepareProviderOverrides(mockEntityRepositories, overrideProviders),
    serviceSpec,
  );
}

function addOnceMock(mock: OnceMockChecks<any, any, any>): void {
  const existingMocksByMethod = onceMocksByObjectByMethod.get(mock.object);
  if (!existingMocksByMethod) {
    onceMocksByObjectByMethod.set(mock.object, { [mock.method]: mock });
    return;
  }

  const existingMock = existingMocksByMethod[mock.method];
  if (!existingMock) {
    existingMocksByMethod[mock.method] = mock;
    return;
  }

  const mockName = onceMockName(mock.object, mock.method as string);
  if (
    existingMock.expectedNthCallArgs === '__NEVER_CALLED' ||
    existingMock.expectedNthCallArgs === '__ANY'
  ) {
    throw new Error(`mock framework already expects no calls to ${mockName}`);
  }
  if (
    mock.expectedNthCallArgs === '__NEVER_CALLED' ||
    mock.expectedNthCallArgs === '__ANY'
  ) {
    throw new Error(`mock framework already expects a call to ${mockName}`);
  }
  existingMock.expectedNthCallArgs.push(mock.expectedNthCallArgs[0]);
}

function checkOnceMocksSetup(): void {
  if (!onceMocksSetUp) {
    throw new Error('INTERNAL.TESTING.SETUP_ONCE_MOCKS_NOT_CALLED');
  }
}

export type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer A>
  ? A
  : never;
export type SyncReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never;

// Upgraded from jest.FunctionPropertyNames
export type AsyncFunctionPropertyNames<T extends AnyObject> =
  jest.FunctionPropertyNames<T> &
    {
      [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? K : never;
    }[keyof T];

// Upgraded from jest.FunctionPropertyNames
export type SyncFunctionPropertyNames<T extends AnyObject> =
  jest.FunctionPropertyNames<T> &
    {
      [K in keyof T]: T[K] extends (...args: any[]) => Promise<any> ? never : K;
    }[keyof T];

// Copied from jest.spyOn return type
export type JestSpyType<
  T extends AnyObject,
  M extends jest.FunctionPropertyNames<Required<T>>,
> = Required<T>[M] extends (...args: any[]) => any
  ? jest.SpyInstance<ReturnType<Required<T>[M]>, jest.ArgsType<Required<T>[M]>>
  : never;

/**
 * Convenience function for mocking async method results & verifying their calls.
 *
 * This function greatly reduces boilerplate required to use Jest's spies:
 * * mocks the resolved value or rejected error of the method,
 * * checks the call arguments are as expected (use jest matchers for complex args!),
 * * verifies it was called the expected number of params,
 * * restores the mocked method after the test, regardless of its result.
 *
 * The calls are stackable, ie. you can call mockPromiseOnce twice for the same method, to mock
 * and verify two separate calls, in that order.
 *
 */
export function mockPromiseOnce<
  T extends AnyObject,
  M extends AsyncFunctionPropertyNames<Required<T>>,
>(
  object: T,
  method: M,
  resultOrError: AsyncReturnType<T[M]> | Error,
  ...expectedParams: jest.ArgsType<T[M]>
): JestSpyType<T, M> {
  checkOnceMocksSetup();
  console.log(
    mockPromiseOnce,
    `adding mocked call for ${onceMockName(object, method)}`,
  );

  const mockImpl: () => AsyncReturnType<Required<T>[M]> = () => {
    console.log(
      mockPromiseOnce,
      `mock called for ${onceMockName(object, method)}`,
    );
    if (resultOrError instanceof Error) throw resultOrError;
    return resultOrError;
  };

  const spy = jest.spyOn(object, method).mockImplementationOnce(mockImpl);
  addOnceMock({ spy, object, method, expectedNthCallArgs: [expectedParams] });
  return spy;
}
