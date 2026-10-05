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
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000101');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000101');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Primary infertility', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000102');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000102');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Secondary infertility', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000201');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000201');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Regular periods', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000202');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000202');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Irregular periods', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000203');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000203');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Oligomenorrhea', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000204');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000204');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Polymenorrhea', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000205');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000205');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Normal', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000206');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000206');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hypomenorrhoea', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000207');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000207');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Primary Amenorrhoea', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000208');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000208');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Secondary Amenorrhoea', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000209');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000209');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Heavy Menstrual Bleeding (HMB)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000210');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000210');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Amenorrhoea', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000301');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000301');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal factor', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000302');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000302');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Diminished ovarian reserve', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000303');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000303');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriosis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000304');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000304');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Polycystic ovary syndrome (PCOS)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000305');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000305');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Uterine Factor', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000306');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000306');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Female infertility due to advanced maternal age', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000307');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000307');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Other female factors', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000311');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000311');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal block unilateral', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000312');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000312');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal block bilateral', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000313');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000313');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Previous ectopic', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000314');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000314');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hydrosalpinx', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000315');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000315');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hematosalpinx', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000321');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000321');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Borderline Ovarian Reserve', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000322');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000322');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Patient-Oriented Strategies Encompassing IndividualizeD Oocyte Number (POSEIDON)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000323');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000323');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'POSEIDON GROUP 1a', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000324');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000324');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'POSEIDON GROUP 1b', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000325');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000325');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'POSEIDON GROUP 2a', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000326');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000326');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'POSEIDON GROUP 2b', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000327');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000327');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'POSEIDON GROUP 3', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000328');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000328');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'POSEIDON GROUP 4', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000331');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000331');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'American Society for Reproductive Medicine-ASRM', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000332');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000332');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriosis Fertility Index-EFI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000341');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000341');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Phenotype A (Classic/Severe)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000342');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000342');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Phenotype B (Classic)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000343');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000343');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Phenotype C (Ovulatory)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000344');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000344');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Phenotype D (Mild/Non-hyperandrogenic)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000351');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000351');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Adenomyosis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000352');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000352');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Fibroids', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000353');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000353');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Polyps', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000354');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000354');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Asherman''s', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000355');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000355');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Septate Uterus', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000356');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000356');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Unicornuate uterus', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000361');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000361');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hypogonadotropic hypogonadism', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000362');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000362');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Oncofertility', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000363');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000363');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'H/O Tuberculosis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000364');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000364');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Turner Mosaic', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000365');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000365');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Unexplained Infertility', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000366');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000366');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Serodiscordant couple', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000401');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000401');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Azoospermia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000402');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000402');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Oligozoospermia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000403');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000403');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Asthenozoospermia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000404');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000404');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Teratozoospermia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000405');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000405');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Unexplained Infertility (Male)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000406');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000406');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Erectile dysfunction', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000407');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000407');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ejaculatory Dysfunction', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000408');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000408');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Retrograde Ejaculation', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000409');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000409');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Oligoasthenoteratozoospermia (OATS)', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000411');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000411');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Obstructive Azoospermia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000412');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000412');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Non-Obstructive Azoospermia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000501');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000501');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Letrozole', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000502');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000502');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Human menopausal gonadotropin', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000503');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000503');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Clomiphene citrate', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000504');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000504');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Human menopausal gonadotropin + Clomiphene citrate', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000505');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000505');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Multiple OVI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000601');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Right', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000602');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Left', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000603');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Bilateral', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000611');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000611');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Laparoscopy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000612');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000612');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Open', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000613');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000613');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Laparoscopy converted to open', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000621');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000621');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Uterine Adenomyomectomy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000622');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000622');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Uterine Myomectomy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000623');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000623');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Uterine Isthmocele Repair', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000631');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000631');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Cystectomy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000632');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000632');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Bipolar Ablation', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000633');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000633');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Argon Plasma Coagulation', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000634');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000634');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Drainage', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000635');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000635');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Sclerotherapy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000636');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000636');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriosis Oophorectomy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000641');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000641');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovarian Dermoid/Mature Teratoma', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000642');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000642');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Simple Ovarian Cyst', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000643');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000643');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Paraovarian Cyst', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000644');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000644');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovarian Cyst Aspiration', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000645');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000645');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Oophorectomy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000646');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000646');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovarian Cystectomy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000651');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000651');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Chromopertubation of Fallopian tubes', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000652');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000652');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal cannulation', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000653');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000653');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Salpingectomy of Fallopian tubes', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000654');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000654');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Fimbrioplasty of Fallopian tubes', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000655');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000655');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal clipping of Fallopian tubes', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000656');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000656');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Recanalization of Fallopian tubes', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000661');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000661');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Peritoneal Adhesiolysis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000662');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000662');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Peritonectomy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000701');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000701');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'B-cell lymphoma', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000702');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000702');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Bell''s palsy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000703');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000703');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Intervertebral disc prolapse', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000704');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000704');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Bipolar disorder', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000705');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000705');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Carcinoma of breast', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000706');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000706');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Carcinoma', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000707');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000707');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Cervical tuberculous lymphadenitis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000708');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000708');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ventricular septal defect', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000709');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000709');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ductal carcinoma in situ of breast', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000710');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000710');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Epilepsy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000711');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000711');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tuberculosis of female genital organs', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000712');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000712');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'TB - (tuberculosis) chemotherapy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000713');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000713');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Graves'' disease', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000714');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000714');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'History of tuberculosis drug therapy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000715');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000715');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Genital tuberculosis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000716');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000716');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hyperprolactinemia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000717');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000717');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Trichobezoar', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000718');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000718');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ectopic pregnancy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000719');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000719');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Primary mucinous adenocarcinoma of appendix', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000720');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000720');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Pseudomyxoma peritonei', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000721');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000721');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hidradenitis suppurativa', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000722');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000722');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hodgkin''s disease', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000723');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000723');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Entire tibia', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000724');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000724');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hypertensive disorder', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000725');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000725');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Amlodipine', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000726');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000726');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Type 2 diabetes mellitus', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000727');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000727');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Hypothyroidism', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000728');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000728');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tuberculosis of abdomen', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000729');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000729');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometrioma of left ovary', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000730');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000730');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriosis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000731');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000731');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Vasopressin-related polyuria', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000732');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000732');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Psychiatric', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000733');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000733');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Pulmonary tuberculosis', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000734');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000734');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Systemic lupus erythematosus', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000799');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 4, 11, 0, 1, NOW(), 'c0010002-0000-0000-0000-000000000799');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Other medical disease', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
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
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000017');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000017');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Type of infertility', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000018');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000018');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Married for years', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, 'years', 0, 0, 80);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000019');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000019');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Duration of infertility', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, 'years', 0, 0, 80);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000020');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000020');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Gravida', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 30);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000021');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000021');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Parity', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 30);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000022');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000022');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Living Children', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 30);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000023');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000023');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Abortion or Miscarriage', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 30);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000024');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000024');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ectopic Pregnancy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 30);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000025');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000025');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Pattern of Menstrual cycle', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000026');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 6, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000026');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Last menstrual period', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000027');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000027');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Flow of Menstrual cycle', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000028');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000028');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Irregular cycle type', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000029');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000029');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Type of Amenorrhoea', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000030');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Female Infertility Factor', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000031');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000031');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal Factor Details', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000032');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000032');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Diminished Ovarian Reserve Details', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000033');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000033');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'POSEIDON Group', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000034');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000034');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriosis Classification', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000035');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000035');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'PCOS Phenotype', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000036');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000036');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Uterine Factor Details', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000037');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000037');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Other Female Infertility Factors', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000038');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000038');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Female Factor Others', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000039');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Male Infertility Factor', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000040');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000040');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Azoospermia Details', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000041');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000041');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Male Factor Others', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000042');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000042');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Follicle Stimulating Hormone Husband', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, 'mIU/mL', 1, 0, 100);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000043');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000043');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Testosterone Husband', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, 'ng/dL', 1, 0, 2000);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000044');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000044');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Testicular Biopsy', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000045');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000045');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Previous Ovulation Induction', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000046');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000046');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovulation Induction Drugs OI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000047');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000047');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Dose of drugs in Ovulation Induction', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000048');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000048');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Number of Previous Ovulation Induction', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 50);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000049');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000049');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Year of Previous Ovulation Induction', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 1970, 2100);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000050');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000050');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Previous OI and IUI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000051');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000051');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovulation Induction Drugs IUI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000052');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000052');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Dose of drugs in OI and IUI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000053');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000053');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Number of Previous OI and IUI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 50);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000054');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000054');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Year of Previous OI and IUI', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 1970, 2100);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000055');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000055');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Failed In vitro fertilization', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000056');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 1, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000056');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Number of Failed IVF Cycles', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        INSERT INTO concept_numeric (concept_id, units, allow_decimal, low_absolute, hi_absolute) VALUES (@new_id, NULL, 0, 0, 50);
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000057');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000057');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Previous ART Treatment Clinical Notes', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000058');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000058');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Previous Surgery Performed', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000059');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000059');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Surgical Approach', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000060');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000060');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Year or Date of Surgery', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000061');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000061');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Uterine Surgeries', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000062');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000062');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriosis Surgeries', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000063');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000063');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovarian Surgeries', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000064');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000064');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Fallopian Tube Surgeries', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000065');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000065');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Peritoneal Surgeries', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000066');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000066');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Cystectomy Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000067');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000067');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Bipolar Ablation Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000068');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000068');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic APC Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000069');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000069');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Drainage Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000070');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000070');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriotic Sclerotherapy Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000071');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000071');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Endometriosis Oophorectomy Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000072');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000072');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovarian Dermoid Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000073');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000073');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Simple Ovarian Cyst Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000074');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000074');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Paraovarian Cyst Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000075');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000075');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovarian Cyst Aspiration Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000076');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000076');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Oophorectomy Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000077');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000077');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Ovarian Cystectomy Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000078');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000078');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Chromopertubation Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000079');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000079');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal Cannulation Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000080');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000080');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Salpingectomy Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000081');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000081');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Fimbrioplasty Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000082');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000082');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Tubal Clipping Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000083');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000083');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Recanalization Laterality', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000084');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000084');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Intra-operative Findings', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000085');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000085');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Previous Surgery Other Notes', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 2, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000086');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Medical Disease', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
    ELSE
        SET @new_id = @existing_id;
    END IF;
    

    SET @existing_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000087');
    IF @existing_id IS NULL THEN
        INSERT INTO concept (retired, datatype_id, class_id, is_set, creator, date_created, uuid)
        VALUES (0, 3, 7, 0, 1, NOW(), 'c0010001-0000-0000-0000-000000000087');
        SET @new_id = LAST_INSERT_ID();
        
        INSERT INTO concept_name (concept_id, name, locale, locale_preferred, creator, date_created, concept_name_type, voided, uuid)
        VALUES (@new_id, 'Medical Diseases Others', 'en', 1, 1, NOW(), 'FULLY_SPECIFIED', 0, UUID());
        
        
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
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000017');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000101');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000017');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000102');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000025');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000201');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000025');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000202');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000027');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000205');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000027');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000206');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000027');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000209');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000027');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000210');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000028');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000203');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000028');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000204');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000029');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000207');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000029');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000208');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000301');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000302');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000303');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000304');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000305');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000306');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000030');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000307');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000031');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000311');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000031');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000312');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000031');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000313');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000031');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000314');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000031');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000315');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000032');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000321');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000032');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000322');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000033');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000323');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000033');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000324');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000033');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000325');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000033');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000326');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000033');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000327');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000033');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000328');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000034');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000331');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000034');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000332');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000035');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000341');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000035');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000342');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000035');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000343');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000035');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000344');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000036');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000351');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000036');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000352');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000036');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000353');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000036');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000354');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000036');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000355');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000036');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000356');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000037');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000361');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000037');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000362');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000037');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000363');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000037');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000364');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000037');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000365');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000037');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000366');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000401');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000402');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000403');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000404');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000405');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000406');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000407');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000408');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000039');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000409');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000040');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000411');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000040');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000412');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000045');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000045');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000046');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000501');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000046');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000502');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000046');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000503');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000046');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000504');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000046');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000505');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000050');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000050');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000051');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000501');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000051');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000502');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000051');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000503');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000051');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000504');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000055');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000055');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000058');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000058');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000059');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000611');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000059');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000612');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000059');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000613');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000061');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000621');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000061');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000622');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000061');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000623');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000062');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000631');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000062');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000632');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000062');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000633');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000062');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000634');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000062');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000635');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000062');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000636');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000063');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000641');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000063');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000642');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000063');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000643');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000063');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000644');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000063');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000645');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000063');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000646');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000064');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000651');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000064');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000652');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000064');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000653');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000064');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000654');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000064');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000655');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000064');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000656');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000065');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000661');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000065');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000662');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000066');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000066');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000066');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000067');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000067');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000067');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000068');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000068');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000068');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000069');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000069');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000069');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000070');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000070');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000070');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000071');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000071');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000071');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000072');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000072');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000072');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000073');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000073');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000073');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000074');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000074');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000074');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000075');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000075');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000075');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000076');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000076');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000076');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000077');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000077');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000077');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000078');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000078');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000078');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000079');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000079');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000079');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000080');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000080');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000080');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000081');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000081');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000081');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000082');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000082');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000082');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000083');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000601');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000083');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000602');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000083');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000603');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000701');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000702');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000703');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000704');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000705');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000706');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000707');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000708');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000709');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000710');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000711');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000712');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000713');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000714');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000715');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000716');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000717');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000718');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000719');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000720');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000721');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000722');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000723');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000724');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000725');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000726');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000727');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000728');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000729');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000730');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000731');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000732');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000733');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000734');
    IF @q_id IS NOT NULL AND @a_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM concept_answer WHERE concept_id = @q_id AND answer_concept = @a_id) THEN
            INSERT INTO concept_answer (concept_id, answer_concept, creator, date_created, uuid)
            VALUES (@q_id, @a_id, 1, NOW(), UUID());
        END IF;
    END IF;
    

    SET @q_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010001-0000-0000-0000-000000000086');
    SET @a_id = (SELECT concept_id FROM concept WHERE uuid = 'c0010002-0000-0000-0000-000000000799');
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