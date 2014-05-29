<?php

namespace JaztecAdmin;

return array(
    /**
     * KJ Sencha config.
     */
    'kjsencha'        => array(
        'library_path' => 'http://cdn.sencha.io/ext-4.2.0-gpl/',
        'js'           => array(
            'ext' => 'ext-all-debug.js',
        ),
        'css'          => array(
            'ext' => 'resources/css/ext-all-neptune.css',
        ),
        'direct'       => array(
            'modules' => array(
                'JaztecAdmin' => array(
                    'namespace' => 'JaztecAdmin\Direct',
                    'directory' => __DIR__ . '/../src/JaztecAdmin/Direct',
                ),
            ),
        ),
        'bootstrap'    => array(
            'default' => array(
                'modules'   => array(
                    'JaztecAdmin' => array(
                        'namespace' => 'JaztecAdmin.direct'
                    ),
                ),
                // Ext.Ux classes toevoegen aan de autoloader.
                'paths'     => array(
                    'Ext.ux'      => '/js/classes/Ext.ux',
                    'JaztecAdmin' => '/js/jaztecadmin',
                ),
                'variables' => array(
                    'App' => array(
                        'name'      => 'JaztecAdminApp',
                        'appFolder' => '/js/jaztecadmin'
                    )
                )
            ),
        ),
    ),
    /**
     * AssetManager config
     */
    'asset_manager'   => array(
        'resolver_configs' => array(
            'paths' => array(
                'JaztecAdmin' => __DIR__ . '/../public',
            ),
        ),
        'caching'          => array(
            'default' => array(
                'cache' => 'apc',
            ),
        ),
    ),
    /**
     * JaztecAcl config.
     */
    'jaztec_acl'      => array(
        'name'                => array(
            __NAMESPACE__ => 'jaztec/core-admin',
        ),
        // Redirect the AuthorizedController on Acl failure.
        'redirect_controller' => false,
    ),
    /**
     * JaztecAdmin config
     */
    'jaztec_admin'    => array(
        'modules' => array(
            /**
             * Array of ExtJS controllers as key-value pairs.
             * The key of the 'paths' array will be used to append the file name 
             * and path of the controller.
             * '/' will be refactored to '.'.
             */
            'controllers' => array(
                'paths' => array(
                    'JaztecAdmin.controller' => __DIR__ . '/../public/js/jaztecadmin/controller',
                ),
            ),
            /**
             * Array of ExtJS stores as key-value pairs. Wrapped by an array with a 
             * key value of a valid ExtJS controller name. The JS function querying
             * for stores will use the controller name as parameter.
             * The key of the 'paths' array will be used to append the file name 
             * and path of the store.
             * @example 
             *  'stores' => array(
             *      'ExtJSApp.controller.[ControllerName] => array(
             *          'paths' => array(
             *              'ExtJSApp.store' => __DIR__ . '/../public/js/extjsapp/store',
             *          )
             *      )
             *  )
             * '/' will be refactored to '.'.
             */
            'stores'      => array(

            ),
            /**
             * Array of ExtJS views as key-value pairs. Wrapped by an array with a 
             * key value of a valid ExtJS controller name. The JS function querying
             * for stores will use the controller name as parameter.
             * The key of the 'paths' array will be used to append the file name 
             * and path of the view.
             * @example 
             *  'views' => array(
             *      'ExtJSApp.controller.[ControllerName] => array(
             *          'paths' => array(
             *              'ExtJSApp.view' => __DIR__ . '/../public/js/extjsapp/view',
             *          )
             *      )
             *  )
             * '/' will be refactored to '.'.
             */
            'views'       => array(

            ),
        ),
    ),
    /**
     * Futher configuration.
     */
    'controllers'     => array(
        'invokables' => array(
            'jaztecadmin/index' => 'JaztecAdmin\Controller\IndexController',
        ),
    ),
    'router'          => array(
        'routes' => array(
            'jaztecadmin'           => array(
                'type'          => 'hostname',
                'options'       => array(
                    'route' => 'admin.:host.nl',
                ),
                'may_terminate' => true,
                'child_routes'  => array(
                    'jaztecadmin_home' => array(
                        'type'    => 'literal',
                        'options' => array(
                            'route'       => '/',
                            'constraints' => array(
                                'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'id'     => '[0-9]+',
                            ),
                            'defaults'    => array(
                                'controller' => 'jaztecadmin/index',
                                'action'     => 'index',
                            ),
                        ),
                    ),
                ),
            ),
            'jaztecadmin_protected' => array(
                'type'    => 'literal',
                'options' => array(
                    'route'       => '/s',
                    'constraints' => array(
                        'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                        'id'     => '[0-9]+',
                    ),
                    'defaults'    => array(
                        'controller' => 'jaztecadmin/index',
                        'action'     => 'validate',
                    ),
                ),
            ),
        ),
    ),
    'service_manager' => array(
        'factories' => array(
        ),
    ),
    'view_manager'    => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'template_map'             => array(
            'jaztec-admin/layout' => __DIR__ . '/../view/layout/layout.phtml',
        ),
        'template_path_stack'      => array(
            __DIR__ . '/../view',
        ),
        'strategies'               => array(
            'ViewJsonStrategy'
        ),
    ),
//    'doctrine'        => array(
//        'driver' => array(
//            'jaztecadmin_driver' => array(
//                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
//                'cache' => 'array',
//                'paths' => array(
//                    __DIR__ . '/../src/JaztecAdmin/Entity'
//                )
//            ),
//            'orm_default'        => array(
//                'drivers' => array(
//                    'JaztecAdmin\Entity' => 'jaztecadmin_driver'
//                )
//            )
//        )
//    ),
);
