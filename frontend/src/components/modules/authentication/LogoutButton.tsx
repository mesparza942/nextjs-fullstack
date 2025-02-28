import Button from "@/components/shared/Button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleSignOut = async () => {
    // Clear the NextAuth session without redirecting automatically
    await signOut({ redirect: false });

    // Construct the Cognito logout URL
    const cognitoDomain = process.env.NEXT_PUBLIC_COGNITO_URL;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const logoutUri = encodeURIComponent("http://localhost:3000/login");

    const cognitoLogoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;

    // Redirect the user to Cognito's logout endpoint
    window.location.href = cognitoLogoutUrl;
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default LogoutButton;
