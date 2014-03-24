<?php

/**
 * Credits to Evan Coury for writing this standard bootstrap.
 */

namespace JaztecAdminTest;

use Zend\Loader\AutoloaderFactory;
use Zend\Mvc\Service\ServiceManagerConfig;
use Zend\ServiceManager\ServiceManager;
use Zend\Stdlib\ArrayUtils;
use RuntimeException;

error_reporting(E_ALL | E_STRICT);
chdir(__DIR__);

class Bootstrap
{

    /**
     * @var \Zend\ServiceManager\ServiceManager
     */
    protected static $serviceManager;

    /**
     * @var array
     */
    protected static $config;
    protected static $bootstrap;

    /**
     * Setup the bootstrap.
     *
     * @return void
     */
    public static function init()
    {
        static::initAutoloader();

        // Load a config file.
        if (is_readable(__DIR__ . '/TestConfig.php')) {
            $testConfig = include __DIR__ . '/TestConfig.php';
        } else {
            $testConfig = include __DIR__ . '/TestConfig.php.dist';
        }

        $zf2ModulePaths = array();

        if (isset($testConfig['module_listener_options']['module_paths'])) {
            $modulePaths = $testConfig['module_listener_options']['module_paths'];
            foreach ($modulePaths as $modulePath) {
                if (($path = static::findParentPath($modulePath))) {
                    $zf2ModulePaths[] = $path;
                }
            }
        }

        $zf2ModulePaths = implode(PATH_SEPARATOR, $zf2ModulePaths) . PATH_SEPARATOR;
        $zf2ModulePaths .= getenv('ZF2_MODULES_TEST_PATHS') ? : (defined('ZF2_MODULES_TEST_PATHS') ? ZF2_MODULES_TEST_PATHS : '');

        $baseConfig = array(
            'module_listener_options' => array(
                'module_paths' => explode(PATH_SEPARATOR, $zf2ModulePaths),
            ),
        );

        $config = ArrayUtils::merge($testConfig, $baseConfig);

        $serviceManager = new ServiceManager(new ServiceManagerConfig());
        $serviceManager->setService('ApplicationConfig', $config);
        $serviceManager->get('ModuleManager')->loadModules();

        static::$serviceManager = $serviceManager;
        static::$config = $config;
    }

    /**
     * @return \Zend\ServiceManager\ServiceManager
     */
    public static function getServiceManager()
    {
        return static::$serviceManager;
    }

    /**
     * @return array
     */
    public static function getConfig()
    {
        return static::$config;
    }

    /**
     * @throws RuntimeException
     * @return void
     */
    protected static function initAutoloader()
    {
        $vendorPath = static::findParentPath('vendor');

        if (is_readable($vendorPath . '/autoload.php')) {
            $loader = include $vendorPath . '/autoload.php';
        } else {
            $zf2Path = getenv('ZF2_PATH') ? : (defined('ZF2_PATH') ? ZF2_PATH : (is_dir($vendorPath . '/ZF2/library') ? $vendorPath . '/ZF2/library' : false));

            if (!$zf2Path) {
                throw new RuntimeException('Unable to load ZF2. Run `php composer.phar install` or define a ZF2_PATH environment variable.');
            }

            include $zf2Path . '/Zend/Loader/AutoloaderFactory.php';
        }

        AutoloaderFactory::factory(array(
            'Zend\Loader\StandardAutoloader' => array(
                'autoregister_zf' => true,
                'namespaces'      => array(
                    __NAMESPACE__ => __DIR__ . '/' . __NAMESPACE__,
                ),
            ),
        ));
    }

    /**
     * @param  string $path
     * @return string
     */
    protected static function findParentPath($path)
    {
        $dir         = __DIR__;
        $previousDir = '.';
        while (!is_dir($dir . '/' . $path)) {
            $dir         = dirname($dir);
            if ($previousDir === $dir) {
                return false;
            }
            $previousDir = $dir;
        }

        return $dir . '/' . $path;
    }

}

Bootstrap::init();


//<?php
//namespace CromvoirtseTest;
//
//use Zend\Loader\AutoloaderFactory;
//use Zend\Mvc\Service\ServiceManagerConfig;
//use Zend\ServiceManager\ServiceManager;
//use Zend\Stdlib\ArrayUtils;
//use RuntimeException;
//
//error_reporting(E_ALL | E_STRICT);
//chdir(__DIR__);
//
//class Bootstrap
//{
//    protected static $serviceManager;
//
//    public static function init()
//    {
//        $_SERVER['SERVER_ENV'] = 'unittesting';
//        static::initAutoloader();
//
//        // Load the user-defined test configuration file, if it exists; otherwise, load
//        if (is_readable(__DIR__ . '/TestConfig.php')) {
//            $testConfig = include __DIR__ . '/TestConfig.php';
//        } else {
//            $testConfig = include __DIR__ . '/TestConfig.php.dist';
//        }
//
//        // use ModuleManager to load this module and it's dependencies
//        $baseConfig = array(  );
//
//        $config = ArrayUtils::merge($baseConfig, $testConfig);
//
//        $serviceManager = new ServiceManager(new ServiceManagerConfig());
//        $serviceManager->setService('ApplicationConfig', $config);
//        $serviceManager->get('ModuleManager')->loadModules();
//        $serviceManager->get('Application')->bootstrap();
//
//        static::$serviceManager = $serviceManager;
//    }
//
//    public static function getServiceManager()
//    {
//        return static::$serviceManager;
//    }
//
//    protected static function initAutoloader()
//    {
//        $vendorPath = static::findParentPath('vendor');
//
//        if (is_readable($vendorPath . '/autoload.php')) {
//            $loader = include $vendorPath . '/autoload.php';
//        }
//
//        if (is_readable($vendorPath . '/../bootstrap.php')) {
//            include $vendorPath . '/../bootstrap.php';
//        }
//
//        $zf2Path = getenv('ZF2_PATH') ?: (defined('ZF2_PATH') ? ZF2_PATH : (is_dir($vendorPath . '/Zend') ? $vendorPath . '/Zend' : false));
//
//        if (!$zf2Path) {
//            throw new RuntimeException('Unable to load ZF2. Run `php composer.phar install` or define a ZF2_PATH environment variable.');
//        }
//
//        if (isset($loader)) {
//            $loader->add('Zend', $zf2Path . '/Zend');
//        } else {
//            include $zf2Path . '/Loader/AutoloaderFactory.php';
//            AutoloaderFactory::factory(array(
//                'Zend\Loader\StandardAutoloader' => array(
//                    'autoregister_zf' => true,
//                    'namespaces' => array(
//                        __NAMESPACE__ => __DIR__ . '/' . __NAMESPACE__,
//                    ),
//                ),
//            ));
//        }
//    }
//
//    protected static function findParentPath($path)
//    {
//        $dir = __DIR__;
//        $previousDir = '.';
//        while (!is_dir($dir . '/' . $path)) {
//            $dir = dirname($dir);
//            if ($previousDir === $dir) return false;
//            $previousDir = $dir;
//        }
//        return $dir . '/' . $path;
//    }
//}
//
//Bootstrap::init();