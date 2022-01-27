package info.nemhauser.turmoil.config;

/**
 * A custom security manager that exposes the getClassContext() information
 */
public class StacktraceSecurityManager extends SecurityManager {
	public String getCallerClassName(int callStackDepth) {
		return getClassContext()[callStackDepth].getName();
	}
}