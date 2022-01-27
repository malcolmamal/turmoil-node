package info.nemhauser.turmoil.engine.helpers;

import info.nemhauser.turmoil.engine.enums.Gender;

public class ResourceHelper
{
	public static String[] getPortraits(Gender gender)
	{
		//def portraitsFolder = Holders.getGrailsApplication().mainContext.getResource('images/portraits/' + gender.toString().toLowerCase() + '/').getFile()
		String[] availablePortraits = new String[]{};

		/*
		portraitsFolder.listFiles().each {
			availablePortraits << it.getName()
		}

		 */
		return availablePortraits;
	}
}
