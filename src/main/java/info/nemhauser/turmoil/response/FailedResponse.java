package info.nemhauser.turmoil.response;

import net.minidev.json.JSONObject;

import java.util.Map;

public class FailedResponse
{
	private final String message;

	public FailedResponse(String message)
	{
		this.message = message;
	}

	public Boolean getSuccess()
	{
		return false;
	}

	public String getMessage()
	{
		return message;
	}

	public JSONObject toJSONObject()
	{
		return new JSONObject(Map.of(
				"success", false,
				"message", message
		));
	}
}
