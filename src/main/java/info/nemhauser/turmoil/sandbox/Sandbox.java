package info.nemhauser.turmoil.sandbox;

import groovy.util.ConfigObject;
import groovy.util.ConfigSlurper;
import info.nemhauser.turmoil.TurmoilApplication;
import info.nemhauser.turmoil.config.Logger;
import info.nemhauser.turmoil.engine.domain.Armor;
import info.nemhauser.turmoil.engine.domain.Attribute;
import info.nemhauser.turmoil.engine.domain.Character;
import info.nemhauser.turmoil.engine.domain.Item;
import info.nemhauser.turmoil.engine.enums.ArmorType;
import info.nemhauser.turmoil.engine.enums.ItemRarity;
import info.nemhauser.turmoil.engine.enums.ItemType;
import info.nemhauser.turmoil.engine.generators.ItemAttributeGenerator;
import info.nemhauser.turmoil.engine.generators.ItemGenerator;
import info.nemhauser.turmoil.engine.helpers.*;
import info.nemhauser.turmoil.engine.instances.CombatState;

import info.nemhauser.turmoil.engine.templates.ArmorTemplate;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.jgrapht.alg.shortestpath.KShortestSimplePaths;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.jgrapht.graph.GraphWalk;
import org.json.simple.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class Sandbox
{
	public static void main(String[] args)
	{
		System.out.println("Sandbox started...");

		Character character = new Character("testElement");
		Item item = ItemGenerator.rollItem(character);

		System.out.println(item.toStringFull());

//		ArmorTemplate template = new ArmorTemplate();
//		template.isLegendary = true;
//		template.armorValue = 135;
//		template.rarity = ItemRarity.LEGENDARY;
//		template.itemCode = "SWORD_OF_HATE";
//
//		Armor armor = new Armor(template);
//		armor.itemName = "Dupcia Anety";
//		armor.itemType = ItemType.ARMOR;
//		armor.armorType = ArmorType.CHEST;
//
//		armor.attributes = ItemAttributeGenerator.rollAttributes(armor).toArray(new Attribute[0]);
//		Logger.log("size: " + armor.attributes.length);
//		for (Attribute atr : armor.attributes)
//		{
//			Logger.log(atr.toString());
//		}


		//System.out.println(ItemRarity.LEGENDARY.getAttributesQuantity());

//		DefaultUndirectedGraph<String, DefaultEdge> graph = InstanceHelper.getInstanceGraph();
//		DijkstraShortestPath<String, DefaultEdge> dijkstraGraph = new DijkstraShortestPath<String, DefaultEdge>(graph);
//		GraphWalk<String, DefaultEdge> graphWalk = (GraphWalk<String, DefaultEdge>) dijkstraGraph.getPath("8-3", "1-4");
//
//		System.out.println("Results: " + graphWalk.toString());
//		System.out.println("Edges2: " + graph.getEdgeSource(graphWalk.getEdgeList().get(0)));


		//ItemTemplatesHelper.parseCommonAccessories();

		//ItemRarity rarity = (ItemRarity) ServerHelper.getEnumValues().getProperRandomItemRarity();
		//System.out.println(rarity.toString());

		//*
		//Character character = new Character();

		//instanceActionEnemy(character, "polygon-5-4");


		//DefaultUndirectedGraph<String, DefaultEdge> graph = InstanceHelper.getInstanceGraph();
		//CombatState cs = InstanceHelper.createCombatState(character);

		 //*/
	}

	public static String instanceMove(Character character, String position)
	{
		JSONObject json = new JSONObject();
		if (position != null && character != null)
		{
			CombatState cs = TurmoilApplication.getCombatState();
			cs.friend.instancePosition = position;

			json.put("success", true);
			json.put("friendlyTurn", true);
			json.put("actionType", "move");
			json.put("polygonId" , cs.friend.instancePosition);
		}
		return json.toJSONString();
	}

	public static String instanceActionEnemy(Character character, String position)
	{
		// todo
		double healthBarValue = 100;

		//TODO: investigate issue: The end vertex is the same as the start vertex!.
		JSONObject json = new JSONObject();
		if (position != null && character != null)
		{
			json.put("success", true);

			CombatState cs = InstanceHelper.getCombatState(character);

			String enemyPosition = cs.enemy.instancePosition;
			String characterPosition = cs.friend.instancePosition;

			DefaultUndirectedGraph<String, DefaultEdge> graph = InstanceHelper.getInstanceGraph();
			//List<DefaultEdge> sp = (List<DefaultEdge>)DijkstraShortestPath.findPathBetween(graph, enemyPosition, characterPosition);
			DijkstraShortestPath<String, DefaultEdge> dijkstraGraph = new DijkstraShortestPath<String, DefaultEdge>(graph);
			GraphWalk<String, DefaultEdge> graphWalk = (GraphWalk<String, DefaultEdge>) dijkstraGraph.getPath(enemyPosition, characterPosition);
			//KShortestSimplePaths pathing = new KShortestSimplePaths(graph, cs.enemy.instancePosition, 1);
			//List<GraphPath<String, DefaultEdge>> path = pathing.getPaths(cs.friend.instancePosition);

			System.out.println(graphWalk.toString());

//			def newPosition = Graphs.getPathVertexList(path.first()).getAt(1);
//			String newPolygon = "polygon-" + newPosition;
//
//			json.put("polygonId", newPolygon);
//			if (path.first().getEdgeList().size() == 1)
//			{
//				cs.friend.currentHealth -= 5;
//
//				json.put("actionType", "attack");
//				json.put("attackingUnit", position);
//				json.put("damageDealt", 5);
//				json.put("healthBar", Math.floor(cs.friend.currentHealth * healthBarValue / cs.friend.health));
//			}
//			else
//			{
//				cs.enemy.instancePosition = newPolygon;
//
//				json.put("actionType", "move");
//				json.put("unitToMove", position);
//				json.put("path", path);
//			}
		}
		return json.toJSONString();
	}
}
