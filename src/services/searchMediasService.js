import { showToastMessage } from './toastService';

const baseUrl = import.meta.env.VITE_API_URL;

export async function searchMedia(mediaType, title) {
    const url = `${baseUrl}/search/${mediaType.labelPluralLowerCase}?title=${title}`;

    try {
        const response = await fetch(url);
        if (response.ok)
            return await response.json();
        else
            return [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
}


export async function getRecommendedMedias(mediaType, selectedMedias) {
    if (selectedMedias.length === 0) {
        console.warn("No media selected for AI recommendations");
        return;
    }
    try {
        const url = `${baseUrl}/recommendations/${mediaType.labelPluralLowerCase}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ medias: selectedMedias })
        });
        if (response.status === 429) {
            showToastMessage("You reached the maximum requests for recommendation. Please try again later.");
            return [];
        }
        if (response.ok)
            return await response.json();
        else
            return [];
    } catch (error) {
        console.error("Error fetching AI recommendations:", error);
        return [];
    }
}