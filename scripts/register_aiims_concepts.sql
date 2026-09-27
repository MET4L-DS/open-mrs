DELIMITER $$
DROP PROCEDURE IF EXISTS register_aiims_concepts$$
CREATE PROCEDURE register_aiims_concepts()
BEGIN

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '160296AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), '160296AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Profession or honours', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), '159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Graduate', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '159785AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), '159785AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Intermediate or diploma', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), '1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'High school certificate', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '160297AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), '160297AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Middle school certificate', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), '1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Primary school certificate', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '160298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), '160298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Illiterate', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000001');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000001');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Legislators, senior officials and managers', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000002');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000002');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Professionals', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000003');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000003');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Technicians and associate professionals', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000004');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000004');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Clerks', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000005');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000005');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Skilled workers and shop and market sale workers', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000006');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000006');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Skilled agricultural and fishery workers', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000007');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000007');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Craft and related trade workers', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000008');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000008');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Plant and machine operators and assemblers', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000009');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000009');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Elementary occupation', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000010');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000010');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Unemployed', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000001');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010003-0000-0000-0000-000000000001');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Upper (I)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000002');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010003-0000-0000-0000-000000000002');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Upper Middle (II)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000003');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010003-0000-0000-0000-000000000003');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Lower Middle (III)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000004');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010003-0000-0000-0000-000000000004');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Upper Lower (IV)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000005');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010003-0000-0000-0000-000000000005');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Lower (V)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000001');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000001');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Consultant Unit', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000002');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000002');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Consultant Name', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000003');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000003');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Patient Name', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000004');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000004');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Patient Age', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, 'years', 0, 0, 130);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000005');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000005');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Unique Health Identifier', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000006');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000006');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'In-Vitro-Fertilization Number', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000007');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000007');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Husband Name', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000008');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000008');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Husband Age', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, 'years', 0, 0, 130);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000009');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000009');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Husband Body Mass Index', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, 'kg/m2', 1, 5, 90);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000010');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000010');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Phone Number Wife', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000011');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000011');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Phone Number Husband', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Education Wife', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000013');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Education Husband', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000014');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Occupation Wife', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000015');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Occupation Husband', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000016');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000016');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Socioeconomic Status', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '160296AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '159785AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '160297AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = '1712AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '160298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '160296AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '159785AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1714AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '160297AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1713AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000013');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '160298AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000001');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000002');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000003');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000004');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000005');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000006');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000007');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000008');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000009');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000014');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000010');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000001');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000002');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000003');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000004');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000005');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000006');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000007');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000008');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000009');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000015');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000010');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000016');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000001');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000016');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000002');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000016');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000003');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000016');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000004');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000016');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010003-0000-0000-0000-000000000005');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    
END$$
DELIMITER ;
CALL register_aiims_concepts();
DROP PROCEDURE register_aiims_concepts;