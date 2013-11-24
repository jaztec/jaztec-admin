<?php

namespace JaztecAdmin;

return array(
    /**
     * KJ Sencha config.
     */
    'kjsencha' => array(
        'library_path' => 'http://cdn.sencha.io/ext-4.2.0-gpl/',
        'js' => array(
            'ext' => 'ext-all.js',
        ),
        'css' => array(
            'ext' => 'resources/css/ext-all-gray.css',
        ),
        'direct' => array(
            'modules' => array(
                'Startup' => array(
                    'namespace' => 'JaztecAdmin\Direct',
                    'directory' => __DIR__ . '/../src/JaztecAdmin/Direct',
                ),
            ),
        ),
        'bootstrap' => array(
            'default' => array(
                'modules' => array(
                    'JaztecAdmin' => array(
                        'namespace' => 'JaztecAdmin.direct'
                    ),
                ),
                // Ext.Ux classes toevoegen aan de autoloader.
                'paths' => array(
                    'Ext.ux' => '/js/classes/Ext.ux',
                    'JaztecAdmin' => '/js/JaztecAdmin',
                ),
            ),
        ),
    ),
    /**
     * AssetManager config
     */
    'asset_manager' => array(
        'resolver_configs' => array(
            'paths' => array(
                'JaztecAdmin' => __DIR__ . '/../public',
            ),
        ),
        'caching' => array(
            'default' => array(
                'cache' => 'apc',
            ),
        ),
    ),
    /**
     * JaztecAcl config.
     */
    'jaztec_acl' => array(
        'name' => array(
            __NAMESPACE__ => 'jaztec/core-admin',
        )
    ),
    'controllers' => array(
        'invokables' => array(
            'jaztecadmin/index' => 'JaztecAdmin\Controller\IndexController',
        ),
    ),
    'router' => array(
        'routes' => array(
            'jaztecadmin' => array(
                'type' => 'hostname',
                'options' => array(
                    'route' => 'core-admin.:host.nl',
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'jaztecadmin/admin/home' => array(
                        'type' => 'literal',
                        'options' => array(
                            'route' => '/',
                            'constraints' => array(
                                'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'id' => '[0-9]+',
                            ),
                            'defaults' => array(
                                'controller' => 'jaztecadmin/index',
                                'action' => 'index',
                            ),
                        ),
                    ),
                ),
            ),
        ),
    ),
    'service_manager' => array(
        'factories' => array(
            'translator' => 'Zend\I18n\Translator\TranslatorServiceFactory',
        ),
    ),
    'translator' => array(
        'locale' => 'en_US',
        'translation_patterns' => array(
            array(
                'type' => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern' => '%s.mo',
            ),
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => false,
        'display_exceptions' => false,
        'doctype' => 'HTML5',
        'template_map' => array(
            'jaztec-admin/layout' => __DIR__ . '/../view/layout/layout.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
        'strategies' => array(
            'ViewJsonStrategy'
        ),
    ),
    'doctrine' => array(
        'driver' => array(
            'jaztecadmin_driver' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(
                    __DIR__ . '/../src/JaztecAdmin/Entity'
                )
            ),
            'orm_default' => array(
                'drivers' => array(
                    'JaztecAdmin\Entity' => 'jaztecadmin_driver'
                )
            )
        )
    ),
);
