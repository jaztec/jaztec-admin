INSERT INTO acl_privileges (`type`, `privilege`, `role`, `resource`) VALUES ('allow', 'index', 1, 2);
INSERT INTO acl_privileges (`type`, `privilege`, `role`, `resource`) VALUES ('allow', 'validate', 2, 2);

INSERT INTO acl_privileges (`type`, `privilege`, `role`, `resource`) 
VALUES (
	'allow',
	'getControllers',
	1,
	(SELECT id FROM acl_resources WHERE `name` = 'jaztecadmin/direct/framework')
);