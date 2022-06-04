import React from "react";
import {languages, languagesAbbreviation} from "../utils/languages";

const LanguageDropdown = ({handleLanguageChange}) => (
    <select onChange={handleLanguageChange}>
        {languages.map((lang, index) =>
            <option value={languagesAbbreviation[index]}
                    key={lang}>
                {lang}</option>
        )}
    </select>
)

export default LanguageDropdown;
