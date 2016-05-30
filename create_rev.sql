CREATE PROCEDURE create_rev(
	IN rev_com	varchar(100),
	IN iss_tim	TIMESTAMP,
	IN date_char varchar(100),
	OUT newrev varchar(100)
)
BEGIN
	  DECLARE mindate varchar(100);
    DECLARE maxdate varchar(100);
    SET mindate = CONCAT(date_char,' 00:00:01');
    SET maxdate = CONCAT(date_char,' 23:59:59');

    START TRANSACTION;
		SET newrev = (SELECT IFNULL(MAX(revision_number),-1) FROM wrldc_scheduling_project.revision_details WHERE issue_time BETWEEN mindate AND maxdate);
		SET newrev = newrev + 1;
        INSERT INTO revision_details (revision_number, comment, issue_time) VALUES (newrev, rev_com, iss_tim);
    COMMIT;
END