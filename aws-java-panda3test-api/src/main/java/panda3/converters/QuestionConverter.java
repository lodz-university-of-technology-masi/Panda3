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
        Gson gson = new Gson();
        return gson.toJson(questions);
    }

    @Override
    public List<Question> unconvert(String s) {
        Type typeOfQuestionList = new TypeToken<List<Question>>(){}.getType();
        Gson gson = new Gson();
        return gson.fromJson(s, typeOfQuestionList);
    }
}
