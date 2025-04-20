import styled from "styled-components";

export const AccountContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  overflow-x: hidden;
  font-family: "MedievalSharp", cursive;
  color: ${({ theme }) => theme.text};
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.3;
`;

export const HeaderContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 1rem;
  background: linear-gradient(
    to right,
    transparent,
    ${({ theme }) => theme.primary}80,
    transparent
  );
  border-bottom: 2px solid ${({ theme }) => theme.accent};
  border-top: 2px solid ${({ theme }) => theme.accent};
`;

export const MainTitle = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.accent};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5rem;
  letter-spacing: 2px;
`;

export const MainSubtitle = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoadingAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;

  .sword-spin {
    animation: spin 1.5s linear infinite;
    color: ${({ theme }) => theme.accent};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ProfileSection = styled.section`
  background: ${({ theme }) => theme.secondary};
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed ${({ theme }) => theme.border};
`;

export const ProfileTitle = styled.h2`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textTitle};
`;

export const ProfileContent = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const PhotoSection = styled.div`
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const ProfilePhoto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 15px ${({ theme }) => theme.accent}80;
`;

export const PhotoUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primary}20;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary}40;
  }
`;

export const ActionButton = styled.button<{ variant?: "cancel" }>`
  padding: 0.5rem 1rem;
  background: ${({ theme, variant }) =>
    variant === "cancel" ? theme.secondary : theme.accent};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === "cancel" ? theme.border : theme.accent};
  color: ${({ theme, variant }) =>
    variant === "cancel" ? theme.text : theme.textTitle};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoLabel = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textTitle};
  font-size: 1.1rem;
`;

export const InfoValue = styled.span`
  font-family: "Book Antiqua", serif;
  padding: 0.5rem;
  background: ${({ theme }) => theme.primary}10;
  border-radius: 4px;
`;

export const HiddenCanvas = styled.canvas`
  display: none;
`;

export const CropContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.accent};
  
  .ReactCrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    &__crop-selection {
      border-radius: 50% !important;
    }
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const PhotoActions = styled.div`
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;