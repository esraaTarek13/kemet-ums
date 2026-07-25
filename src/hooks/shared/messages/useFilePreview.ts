import { useEffect, useMemo } from "react";

export function useFilePreview(file: File) {
    const isImage = file.type.startsWith("image/");

    // Derived value
    const previewUrl = useMemo(
        () => (isImage ? URL.createObjectURL(file) : null),
        [file, isImage],
    );

    // Cleanup only — this is the legitimate use of useEffect here
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return { isImage, previewUrl };
}