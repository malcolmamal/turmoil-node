package info.nemhauser.turmoil.engine.helpers;

import java.security.SecureRandom;

public class EnumHelper
{
	public static <T extends Enum<?>> T randomEnum(Class<T> clazz)
	{
		int x = new SecureRandom().nextInt(clazz.getEnumConstants().length);
		return clazz.getEnumConstants()[x];
	}
}
