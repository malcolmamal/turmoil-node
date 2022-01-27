package info.nemhauser.turmoil.engine.world.map.graph;

import info.nemhauser.turmoil.engine.exceptions.GraphException;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.DefaultUndirectedGraph;
import org.jgrapht.graph.GraphWalk;

public class Pathing
{
	DefaultUndirectedGraph<String, DefaultEdge> graph;
	String source;
	String target;

	public Pathing(DefaultUndirectedGraph<String, DefaultEdge> graph, String source, String target)
	{
		this.graph = graph;
		this.source = source;
		this.target = target;
	}

	public static String getNextPosition(DefaultUndirectedGraph<String, DefaultEdge> graph, String source, String target) throws GraphException
	{
		//TODO: check if path not exists

		GraphWalk<String, DefaultEdge> graphWalk = getPath(graph, source, target);

		if (graphWalk == null)
		{
			throw new GraphException("Empty graph walk for (" + source + ", " + target + ")" );
		}

		if (graphWalk.getEdgeList() == null)
		{
			throw new GraphException("Empty edge list for (" + source + ", " + target + ")" );
		}

		if (source.equals(graph.getEdgeSource(graphWalk.getEdgeList().get(0))))
		{
			return graph.getEdgeTarget(graphWalk.getEdgeList().get(0));
		}

		return graph.getEdgeSource(graphWalk.getEdgeList().get(0));
	}

	public static GraphWalk<String, DefaultEdge> getPath(DefaultUndirectedGraph<String, DefaultEdge> graph, String source, String target)
	{
		DijkstraShortestPath<String, DefaultEdge> dijkstraGraph = new DijkstraShortestPath<String, DefaultEdge>(graph);

		return (GraphWalk<String, DefaultEdge>) dijkstraGraph.getPath(source, target);
	}

	public static int getDistance(DefaultUndirectedGraph<String, DefaultEdge> graph, String source, String target)
	{
		//TODO: check if path not exists

		return getPath(graph, source, target).getEdgeList().size() - 1;
	}

	public String getNextPosition() throws GraphException
	{
		return getNextPosition(graph, source, target);
	}

	public GraphWalk<String, DefaultEdge> getPath()
	{
		return getPath(graph, source, target);
	}

	public int getDistance()
	{
		return getDistance(graph, source, target);
	}
}
