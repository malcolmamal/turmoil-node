package info.nemhauser.turmoil.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Accessory;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.domain.Weapon;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class JSONController {

    @RequestMapping(value = "/json/jsonFetchItem/{item}", produces = "application/json")
    public @ResponseBody String
    getJSONItem(@PathVariable String item)
    {
        Item itemForTooltip = TurmoilApplication.getServerState().getItem(item);
        if (itemForTooltip == null)
        {
            if (TurmoilApplication.getCharacter("fox").getEquippedItems().containsKey(item))
            {
                itemForTooltip = TurmoilApplication.getCharacter("fox").getEquippedItems().get(item);
            }
        }

        if (itemForTooltip == null)
        {
            return "Tried to find item but failed, for code:" + item;
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        try {
            return mapper.writeValueAsString(itemForTooltip);

            /*
             Weapon newItem = mapper.readValue(jsonString, Weapon.class);
             return mapper.writeValueAsString(jsonString);
            */
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "error: " + e;
        }
    }

    @RequestMapping(value = "/json/jsonItemToStash", produces = "application/json", method = RequestMethod.POST)
    public @ResponseBody JSONObject addJsonItemToStash(@RequestBody String jsonString)
    {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        JSONObject object = new JSONObject();

        try
        {
            Logger.log("Adding item to stash");
            Logger.log(jsonString);
            Item item = null;

            if (jsonString.contains("\"itemType\": \"WEAPON\"") || jsonString.contains("\"itemType\":\"WEAPON\""))
            {
                Logger.log("Adding weapon");
                Weapon newItem = mapper.readValue(jsonString, Weapon.class);
                TurmoilApplication.getServerState().addItem(newItem);
                item = newItem;
            }
            else if (jsonString.contains("\"itemType\": \"ARMOR\"") || jsonString.contains("\"itemType\":\"ARMOR\""))
            {
                Logger.log("Adding armor");
                Armor newItem = mapper.readValue(jsonString, Armor.class);
                TurmoilApplication.getServerState().addItem(newItem);
                item = newItem;
            }
            else if (jsonString.contains("\"itemType\": \"ACCESSORY\"") || jsonString.contains("\"itemType\":\"ACCESSORY\""))
            {
                Logger.log("Adding accessory");
                Accessory newItem = mapper.readValue(jsonString, Accessory.class);
                TurmoilApplication.getServerState().addItem(newItem);
                item = newItem;
            }

            object.put("status", true);
            object.put("jsonString", jsonString);
            if (item != null)
            {
                object.put("id", item.id);
                object.put("itemName", item.itemName);
                object.put("itemCode", item.itemCode);
            }
        } catch (JsonProcessingException e) {
            e.printStackTrace();

            object.put("status", false);
            object.put("error", e.toString());
        }

        return object;
    }

    @RequestMapping(value = {"/json/jsonGenerateItem", "/json/jsonGenerateItem/{boost}"}, produces = "application/json")
    public @ResponseBody String generateItem(@PathVariable(required = false) String boost)
    {
        if (boost == null)
        {
            boost = "0";
        }

        Item item = ItemGenerator.rollItem(TurmoilApplication.getCharacter("fox"), Integer.parseInt(boost));
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        String jsonString = null;
        try {
            jsonString = mapper.writeValueAsString(item);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return jsonString;
    }
}
