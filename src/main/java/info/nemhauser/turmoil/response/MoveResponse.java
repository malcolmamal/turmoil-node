package info.nemhauser.turmoil.response;

import net.minidev.json.JSONObject;

import java.util.Map;

public class MoveResponse
{
	private final String actionType;
	private final Boolean success;
	private final String polygonId;
	private final String unitToMove;
	private final EnemyUnitResponse unitResponse;

	public MoveResponse(String actionType, Boolean success, String polygonId, String unitToMove, EnemyUnitResponse unitResponse)
	{
		this.actionType = actionType;
		this.success = success;
		this.polygonId = polygonId;
		this.unitToMove = unitToMove;
		this.unitResponse = unitResponse;
	}

	public String getActionType()
	{
		return actionType;
	}

	public Boolean getSuccess()
	{
		return success;
	}

	public String getPolygonId()
	{
		return polygonId;
	}

	public String getUnitToMove()
	{
		return unitToMove;
	}

	public JSONObject toJSONObject()
	{
		return new JSONObject(Map.of(
				"actionType", actionType,
				"success", success,
				"polygonId", polygonId,
				"unitToMove", unitToMove,
				"unit", unitResponse
		));
	}
}
