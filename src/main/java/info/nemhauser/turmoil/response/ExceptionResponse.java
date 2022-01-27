package info.nemhauser.turmoil.response;

import net.minidev.json.JSONObject;

import java.util.Map;

public class ExceptionResponse
{
	private final String message;

	public ExceptionResponse(Exception e)
	{
		message = e.getMessage();
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
