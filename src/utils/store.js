import { ref } from 'vue';

export const mediaTypes = [
    {
        id: 0,
        labelPlural: "Movies",
        labelPluralLowerCase: "movies",
        labelLowerCase: "movie",
        tmdbCategory: "movie",
        icon: "/src/assets/movie.svg",
        mosaic: "/src/assets/mosaic-movies.svg",
    },
    {
        id: 1,
        labelPlural: "Series",
        labelPluralLowerCase: "series",
        labelLowerCase: "serie",
        tmdbCategory: "tv",
        icon: "/src/assets/tv.svg",
        mosaic: "/src/assets/mosaic-series.svg",
    }
]

export const selectedMedias = ref([]);

export const selectedMediaType = ref(null);

