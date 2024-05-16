import { Image, ImageProps } from "react-native";

interface HeroImageProps extends ImageProps {
  thumbnail: {
    path: string;
    extension: string;
  };
  otherStyles?: string;
}

export function HeroImage({
  thumbnail,
  otherStyles,
  resizeMode,
}: HeroImageProps) {
  return (
    <Image
      source={
        thumbnail.path.includes("image_not_available")
          ? require("../assets/images/not-found.jpg")
          : {
              uri: `${thumbnail.path}.${thumbnail.extension}`,
            }
      }
      resizeMode={resizeMode ?? "cover"}
      className={`rounded-2xl ${otherStyles}`}
    />
  );
}
