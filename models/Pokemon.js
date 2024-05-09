import { Schema, model, models } from "mongoose";

const PokemonSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    types: {
        type: [String], // Array of strings for types
        required: true,
    },
    sprite: {
        type: String,
        required: true,
    },
});

const Pokemon = models.Pokemon || model('Pokemon', PokemonSchema);

export default Pokemon;
