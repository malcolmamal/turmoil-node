package info.nemhauser.turmoil.controller;

import info.nemhauser.turmoil.config.Logger;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AccountController
{
	private static JSONObject windowsSettings;

	@RequestMapping(value = "/account/saveWindowsSettings/{settings}", produces = "application/json")
	public @ResponseBody
	JSONObject saveWindowsSettings(@PathVariable String settings)
	{
			try
			{
				windowsSettings = (JSONObject) new JSONParser(JSONParser.MODE_PERMISSIVE).parse(settings);
			}
			catch (ParseException e)
			{
				Logger.log(e.toString());

				windowsSettings = new JSONObject();
			}

		return windowsSettings;
	}
}
