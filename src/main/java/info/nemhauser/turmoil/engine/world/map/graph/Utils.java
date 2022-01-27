package info.nemhauser.turmoil.engine.world.map.graph;

import info.nemhauser.turmoil.engine.exceptions.GraphException;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.springframework.util.SerializationUtils;

public class Utils
{
	public static DefaultUndirectedGraph<String, DefaultEdge> cloneGraph(DefaultUndirectedGraph<String, DefaultEdge> originalGraph) throws GraphException
	{
		DefaultUndirectedGraph<String, DefaultEdge> graph = (DefaultUndirectedGraph<String, DefaultEdge>) SerializationUtils.deserialize(SerializationUtils.serialize(originalGraph));

		if (graph == null)
		{
			throw new GraphException("Could not copy a graph");
		}

		return graph;
	}
}
