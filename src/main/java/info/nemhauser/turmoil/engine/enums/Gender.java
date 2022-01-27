package info.nemhauser.turmoil.engine.enums;

public enum Gender {

	MALE,
	FEMALE,
	UNKNOWN;

	Gender() {}

	public static Gender[] allowedForCreation()
	{
		return new Gender[] {MALE, FEMALE};
	}

	public static Gender getProperGender(String gender)
	{
		if (gender != null && gender.toLowerCase().equals(Gender.FEMALE.toString().toLowerCase()))
		{
			return Gender.FEMALE;
		}
		return Gender.MALE;
	}
}