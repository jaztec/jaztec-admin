<?php

namespace JaztecAdmin;

use Zend\ModuleManager\ModuleManager;
use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
use Zend\ModuleManager\Feature\ConfigProviderInterface;
use Zend\ModuleManager\Feature\ServiceProviderInterface;

use JaztecAdmin\Frontend\Component\Loginform;
use JaztecAdmin\Frontend\ApplicationView;

class Module implements
AutoloaderProviderInterface, ConfigProviderInterface, ServiceProviderInterface {

    public function init(ModuleManager $moduleManager) {
        
    }

    /**
     * {@inheritDoc}
     */
    public function getConfig() {
        return include __DIR__ . '/../../config/module.config.php';
    }

    /**
     * {@inheritDoc}
     */
    public function getAutoloaderConfig() {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__,
                ),
            ),
        );
    }

    /**
     * {@inheritDoc}
     */
    public function getServiceConfig() {
        return include __DIR__ . '/../../config/service.config.php';
    }

    public function getComponentConfig() {
        return array(
            'factories' => array(
                'JaztecAdminComponent.Gateway' => function($sm) {
                    $authService = $sm->get('zfcuser_auth_service');
                    if ($authService->hasIdentity()) {
                        return new ApplicationView(array());
                    } else {
                        return new Loginform(array());
                    }
                },
            )
        );
    }
}
