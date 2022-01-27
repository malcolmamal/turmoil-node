package info.nemhauser.turmoil.utils;

import java.security.SecureRandom;

public class Random
{
	private static final SecureRandom random = new SecureRandom();

	public static <T extends Enum<?>> T randomEnum(Class<T> clazz)
	{
		int x = random.nextInt(clazz.getEnumConstants().length);

		return clazz.getEnumConstants()[x];
	}
}
