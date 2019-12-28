package panda3.converters;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import panda3.model.Language;
import panda3.model.Question;

import java.util.List;
import java.lang.reflect.Type;

public class QuestionConverter implements DynamoDBTypeConverter<String, List<Question>> {
    @Override
    public String convert(List<Question> questions) {
        return new Gson().toJson(questions);
    }

    @Override
    public List<Question> unconvert(String s) {;
        return new Gson().fromJson(s, new TypeToken<List<Question>>(){}.getType());
    }
}
