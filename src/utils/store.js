import { ref } from 'vue';

export const mediaTypes = [
    {
        id: 0,
        labelPlural: "Movies",
        labelPluralLowerCase: "movies",
        labelLowerCase: "movie",
        tmdbCategory: "movie",
        icon: new URL('../assets/movie.svg', import.meta.url).href,
        mosaic: new URL('../assets/mosaic-movies.png', import.meta.url).href,
    },
    {
        id: 1,
        labelPlural: "Series",
        labelPluralLowerCase: "series",
        labelLowerCase: "serie",
        tmdbCategory: "tv",
        icon: new URL('../assets/tv.svg', import.meta.url).href,
        mosaic: new URL('../assets/mosaic-series.png', import.meta.url).href,
    }
]

export const selectedMedias = ref([]);

export const selectedMediaType = ref(null);

