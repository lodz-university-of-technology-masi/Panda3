package panda3.validator;

import java.util.LinkedHashMap;

public class TestValidator {
    private boolean checkLanguages(LinkedHashMap<String, String> languageObject){
        return (languageObject.get("label").equals("Polish") || languageObject.get("label").equals("English"))
                && (languageObject.get("value").equals("pl") || languageObject.get("value").equals("en"));
    }


}
