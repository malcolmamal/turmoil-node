package info.nemhauser.turmoil.engine.enums;

public enum ItemSlot {

	RIGHT_HAND, LEFT_HAND,
	HELM, CHEST, BELT, PANTS, BOOTS,
	PAULDRONS, GLOVES, BRACERS,
	AMULET, RING_ONE, RING_TWO, RING_THREE, RING_FOUR;

	public String getClassName()
	{
		return "slot_" + this.toString().toLowerCase();
	}
}