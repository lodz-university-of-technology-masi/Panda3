package panda3.converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import panda3.model.Language;

import java.io.IOException;

public class LanguageConverter implements DynamoDBTypeConverter<String, Language> {
    private final Logger logger = LogManager.getLogger(this.getClass());
    private ObjectMapper mapper = new ObjectMapper();
   /* @Override
    public String convert(Language language) {
        return language.getLabel() + "," + language.getValue();
    }

    @Override
    public Language unconvert(String s) {
        logger.error("UnconvertString: " + s);
        String[] r = s.split(",");
        return new Language(r[0], r[1]);
    }*/

    @Override
    public String convert(Language language) {
        String result = null;
        try {
            result = mapper.writeValueAsString(language);
        } catch (JsonProcessingException e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    @Override
    public Language unconvert(String s) {
        JsonNode node = null;
        try {
            node = mapper.readTree(s);
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
        String label = node.get("label").asText();
        String value = node.get("value").asText();
        return new Language(label,value);
    }
}
