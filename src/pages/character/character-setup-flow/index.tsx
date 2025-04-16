import { useEffect } from "react";
import { useAuth } from "../../../context/user-provider";
import { useNavigate } from "react-router-dom";
import { SpecializationSelectionPage } from "../specialization-selection";
import { ClassSelectionPage } from "../class-selection";

export const CharacterSetupFlow = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.specialization && user?.character_class) {
      navigate("/home");
    }
  }, [user, navigate]);

  if (!user?.specialization) {
    return (
      <SpecializationSelectionPage
        onComplete={() => window.location.reload()}
      />
    );
  }

  if (!user?.character_class) {
    return <ClassSelectionPage onComplete={() => window.location.reload()} />;
  }

  return null;
};
