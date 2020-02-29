package com.shipsummarry.data.entity;

import lombok.Getter;

@Getter
public enum RecordType {
    OIL("Масло ГД", "ТОПЛИВО, МАСЛО", 1),
    FUEL_DT("ТОПЛИВО ДТ", "ТОПЛИВО, МАСЛО", 2),
    FUEL_DS("ТОПЛИВО ДС", "ТОПЛИВО, МАСЛО", 3),
    CORRUGATED_PACKAGE("ГОФРОТАРА", "ТЕХНОЛОГИЧЕСКОЕ СНАБЖЕНИЕ", 4),
    POLYPROPYLENE_BAG("ПОЛИПРОПИЛЕНОВЫЕ МЕШКИ ДЛЯ МУКИ", "ТЕХНОЛОГИЧЕСКОЕ СНАБЖЕНИЕ", 5),
    BAGS_WITHOUT_LINER("П/П МЕШКИ БЕЗ ВКЛАДЫША", "ТЕХНОЛОГИЧЕСКОЕ СНАБЖЕНИЕ", 6),
    VACUUM_BAGS("ВАКУУМ МЕШКИ", "ТЕХНОЛОГИЧЕСКОЕ СНАБЖЕНИЕ", 7),
    PLASTIC_BAGS("ПОЛИЭТИЛЕНОВЫЕ ПАКЕТЫ ДЛЯ МЯСА", "ТЕХНОЛОГИЧЕСКОЕ СНАБЖЕНИЕ", 8),
    NATUROX("Антиоксидант НАТУРОКС", "ТЕХНОЛОГИЧЕСКОЕ СНАБЖЕНИЕ", 9),
    TOXININ("Антиоксидант ТОКСИКИН", "ТЕХНОЛОГИЧЕСКОЕ СНАБЖЕНИЕ", 10),
    FROZEN_KRILL_MEAT("МЯСО КРИЛЯ МОРОЖЕННОЕ", "ВЫПУСК ПРОДУКЦИИ", 11),
    KRILL_FLOUR_CHINA("МУКА КРИЛЕВАЯ (КИТАЙСКАЯ МУКОМОЛКА)", "ВЫПУСК ПРОДУКЦИИ", 12),
    KRILL_FLOUR_NEZHIN("МУКА КРИЛЕВАЯ (МУКОМОЛКА НЕЖИН)", "ВЫПУСК ПРОДУКЦИИ", 13),
    ICE_FISH_CATCH("РЫБА ЛЕДЯНАЯ(ПРИЛОВ)", "ВЫПУСК ПРОДУКЦИИ", 14),
    ICE_FISH("РЫБА ЛЕДЯНАЯ", "СУТОЧНЫЙ ВЫЛОВ", 15),
    KRILL_FISH("КРИЛЬ", "СУТОЧНЫЙ ВЫЛОВ", 16),
    OTHER_FISH("ДРУГАЯ РЫБА", "СУТОЧНЫЙ ВЫЛОВ", 17);

    String name;
    String groupName;
    int priority;

    RecordType(String name, String groupName, int priority) {
        this.name = name;
        this.groupName = groupName;
        this.priority = priority;

    }

}
