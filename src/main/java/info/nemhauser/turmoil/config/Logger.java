package info.nemhauser.turmoil.config;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Logger
{
	public static void log(String string)
	{
		System.out.println(
			getDate() +
			"[" + getCallerClassName() + "] " +
			string
		);
	}

	private static String getCallerClassName()
	{
		return new StacktraceSecurityManager().getCallerClassName(3);
	}

	private static String getDate()
	{
		SimpleDateFormat formatter = new SimpleDateFormat("[yyyy-MM-dd HH:mm:ss <Ms>]");

		return formatter.format(new Date(System. currentTimeMillis()));
	}
}
