import React from "react";
import {languages, languagesAbbreviation} from "../../utils/languages";
import {Select} from "antd";

const { Option } = Select;

const LanguageDropdown = ({ handleLanguageChange, activeLanguage }) => (
    <Select defaultValue={activeLanguage} onChange={handleLanguageChange}>
        {languages.map((lang, index) =>
            <Option value={languagesAbbreviation[index]} key={lang}>{lang}</Option>
        )}
    </Select>
)

export default LanguageDropdown;
