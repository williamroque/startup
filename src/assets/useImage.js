import { useEffect, useState } from 'react'

// This solution was borrowed from https://stackoverflow.com/a/70024111

const useImage = imageName => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`./representations/${imageName}.png`);
                setImage(response.default);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchImage();
    }, [imageName]);

    return {
        loading,
        error,
        image,
    };
};

export default useImage;