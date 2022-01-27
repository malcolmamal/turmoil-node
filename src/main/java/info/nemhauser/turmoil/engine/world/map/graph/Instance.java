package info.nemhauser.turmoil.engine.world.map.graph;

import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;

public class Instance
{
	/**
	 * TODO: perhaps should be stored and not recreated all the time?
	 *
	 * @return DefaultUndirectedGraph
	 */
	public static DefaultUndirectedGraph<String, DefaultEdge> getInstanceGraph()
	{
		DefaultUndirectedGraph<String, DefaultEdge> graph = new DefaultUndirectedGraph<>(DefaultEdge.class);

		int maxWidth = 10;
		int maxHeight = 8;

		for (int i = 1; i <= maxWidth; i++)
		{
			for (int j = 1; j <= maxHeight; j++)
			{
				String vertex = i + "-" + j;
				addVertex(graph, vertex);

				if (j > 1)
				{
					// connection from down to up
					addEdge(graph, i + "-" + (j-1), vertex);
				}

				// connection from right vertex to left
				if (i > 1)
				{
					if (i % 2 == 0)
					{
						// connection going down
						if (j > 1)
						{
							addEdge(graph, (i-1) + "-" + (j-1), vertex);
						}

						// connection going up
						addEdge(graph, (i-1) + "-" + j, vertex);
					}
					else
					{
						// connection going down
						addEdge(graph, (i-1) + "-" + j, vertex);

						// connection going up
						if (j < maxHeight)
						{
							addEdge(graph, (i-1) + "-" + (j+1), vertex);
						}
					}
				}
			}
		}

		return graph;
	}

	private static void addVertex(DefaultUndirectedGraph<String, DefaultEdge> graph, String vertex)
	{
		graph.addVertex("polygon-" + vertex);
	}

	private static void addEdge(DefaultUndirectedGraph<String, DefaultEdge> graph, String sourceVertex, String targetVertex)
	{
		graph.addEdge("polygon-" + sourceVertex, "polygon-" + targetVertex);
	}
}
