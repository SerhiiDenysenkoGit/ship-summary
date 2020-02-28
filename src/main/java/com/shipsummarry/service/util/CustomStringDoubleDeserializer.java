package com.shipsummarry.service.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public class CustomStringDoubleDeserializer extends JsonDeserializer<Double> {

    @Override
    public Double deserialize(
            JsonParser jsonParser,
            DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.readValueAsTree();
        if (node.asText().isEmpty()) {
            return null;
        }
        return Double.parseDouble(node.asText());
    }

}
