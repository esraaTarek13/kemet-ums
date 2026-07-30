import { useEffect, useState } from "react";

export function useFilePreview(file: File) {
    const isImage = file.type.startsWith("image/");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!isImage) return;

        const url = URL.createObjectURL(file);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing with Blob URL API, not derived state
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file, isImage]);

    return { isImage, previewUrl: isImage ? previewUrl : null };
}