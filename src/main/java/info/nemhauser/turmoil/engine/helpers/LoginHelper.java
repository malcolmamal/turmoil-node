package info.nemhauser.turmoil.engine.helpers;

import info.nemhauser.turmoil.engine.domain.Account;

public class LoginHelper
{
	public static boolean isLogged()
	{
		//return (ServletContextHolder.getServletContext().loggedAccount != null)
		return true;
	}
	
	public static Account getLoggedAccount()
	{
		return null;
	}
}
