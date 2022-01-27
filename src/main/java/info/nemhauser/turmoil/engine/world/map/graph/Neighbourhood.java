package info.nemhauser.turmoil.engine.world.map.graph;

import org.jgrapht.Graphs;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;

import java.util.LinkedHashSet;
import java.util.Set;

public class Neighbourhood
{
	public static Set<String> getVerticesInRange(DefaultUndirectedGraph<String, DefaultEdge> graph, String centralVertex, int distance)
	{
		Set<String> allVerticesInRange = new LinkedHashSet<>();
		allVerticesInRange.add(centralVertex);

		Set<String> verticesInRange = new LinkedHashSet<>();
		verticesInRange.add(centralVertex);

		Set<String> verticesInspected = new LinkedHashSet<>();

		for (int i = 1; i <= distance; i++)
		{
			for (String vertexToCheck: verticesInRange.toArray(new String[0]))
			{
				if (verticesInspected.contains(vertexToCheck))
				{
					continue;
				}

				allVerticesInRange.addAll(Graphs.neighborSetOf(graph, vertexToCheck));
				verticesInspected.add(vertexToCheck);
			}
			verticesInRange = allVerticesInRange;
		}

		return allVerticesInRange;
	}
}
