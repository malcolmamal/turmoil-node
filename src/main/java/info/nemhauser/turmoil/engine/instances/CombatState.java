package info.nemhauser.turmoil.engine.instances;

import info.nemhauser.turmoil.engine.domain.Monster;
import info.nemhauser.turmoil.engine.domain.Person;
import info.nemhauser.turmoil.engine.exceptions.GraphException;
import info.nemhauser.turmoil.engine.world.map.graph.Instance;
import info.nemhauser.turmoil.engine.world.map.graph.Neighbourhood;
import info.nemhauser.turmoil.engine.world.map.graph.Utils;
import org.jgrapht.Graphs;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.springframework.util.SerializationUtils;

import java.util.*;

public class CombatState
{
	private final DefaultUndirectedGraph<String, DefaultEdge> instanceGraph;

	public Person friend;
	public Monster enemy;

	private final LinkedHashMap<String, Monster> enemies = new LinkedHashMap<>();

	public Integer turn = 1;

	//CombatRoundState ?

	public CombatState()
	{
		instanceGraph = Instance.getInstanceGraph();
	}

	public LinkedHashMap<String, Monster> getEnemies()
	{
		return enemies;
	}

	public Monster getEnemy(String key)
	{
		return enemies.get(key);
	}

	public void addEnemy(Monster monster)
	{
		enemies.put(monster.getIdent(), monster);

		enemy = monster;
	}

	public DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraph()
	{
		return instanceGraph;
	}

	public DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraphForEnemy(Person enemy) throws GraphException
	{
		DefaultUndirectedGraph<String, DefaultEdge> graph = Utils.cloneGraph(instanceGraph);

		for (Monster monster : enemies.values())
		{
			String position = monster.getInstancePosition();

			if (position.equals(enemy.getInstancePosition()))
			{
				continue;
			}

			if (!graph.removeVertex(position))
			{
				System.out.println("failed to remove vertex: " + position);
			}
		}

		return graph;
	}

	public HashMap<String, Monster> getEnemiesOnPositions()
	{
		HashMap<String, Monster> enemiesOnPositions = new HashMap<>();
		for (Monster monster : enemies.values())
		{
			enemiesOnPositions.put(monster.getInstancePosition(), monster);
		}

		return enemiesOnPositions;
	}

	public Monster getEnemyOnPosition(String position)
	{
		return getEnemiesOnPositions().get(position);
	}

	public void removeEnemy(Monster enemy)
	{
		enemies.remove(enemy.getIdent());
	}

	public Set<String> getPolygonsInRange()
	{
		return Neighbourhood.getVerticesInRange(instanceGraph, friend.getInstancePosition(), friend.getMovementPoints());
	}
}
