<?php

namespace JaztecAdmin\Direct;

use JaztecAcl\Direct\AuthorizedDirectObject;

/**
 * Direct class to hold all the framework related functions.
 *
 * @author Jasper van Herpt
 */
class Framework extends AuthorizedDirectObject
{

    public function __construct()
    {
        parent::__construct();
        $this->aclDenominator = 'jaztecadmin/direct/framework';
    }

    /**
     * Scans the paths set in the KJSencha path loader to collect the controllers
     * and scans them against the ACL returning only the controllers the user is
     * allowed to use.
     *
     * The reader will scan for Ext.define statements with a .controller. name.
     *
     * @param  array $values Client side params
     * @return array An array of the allowed controllers to be active.
     */
    public function getControllers(array $values)
    {
        $config     = $this->getServiceLocator()->get('Config');
        if (!isset($config['jaztec_admin']['modules']['controllers']['paths'])) {
            return array();
        };
        $paths      = $config['jaztec_admin']['modules']['controllers']['paths'];

        return $this->getFiles($paths, 'controller');
    }

    /**
     * Returns all views connected to a controller.
     *
     * @param  array $values
     * @return array An array with the allowed views.
     */
    public function getViews(array $values)
    {
        $config = $this->getServiceLocator()->get('Config');
        if (!isset($values['controller'])) {
            throw new Exception('No controller data received.');
        }
        $controller = $values['controller'];
        if (!isset($config['jaztec_admin']['modules']['views'][$controller])) {
            return array();
        };
        $paths  = $config['jaztec_admin']['modules']['views'][$controller]['paths'];

        return $this->getFiles($paths, 'view');
    }

    /**
     * Returns all stores connected to a controller.
     *
     * @param  array $values
     * @return array An array with the allowed stores.
     */
    public function getStores(array $values)
    {
        $config = $this->getServiceLocator()->get('Config');
        if (!isset($values['controller'])) {
            throw new Exception('No controller data received.');
        }
        $controller = $values['controller'];
        if (!isset($config['jaztec_admin']['modules']['stores'][$controller])) {
            return array();
        };
        $paths  = $config['jaztec_admin']['modules']['stores'][$controller]['paths'];

        return $this->getFiles($paths, 'store');
    }

    /**
     * Returns all the ExtJS objects in a given path and checks it against the
     * ACL settings.
     *
     * @param  array  $paths
     * @param  string $aclNamespace
     * @return array
     */
    protected function getFiles(array $paths, $aclNamespace)
    {
        $result = array();
        $object = '';
        foreach ($paths as $namespace => $path) {
            foreach ($this->rglob('*.js', 0, "$path/") as $entry) {
                $entry = pathinfo($entry);
                $extraNs = str_replace('/', '.', str_replace($path, '', $entry['dirname']));
                $object  = $namespace . $extraNs . '.' . $entry['filename'];
                // Validate against the ACL.
                if ($this->checkAcl("extjs-$aclNamespace-" . $object)) {
                    $result[] = $object;
                }
            }
        }

        return $result;
    }

    /**
     * Recursive glob function.
     *
     * @param  int    $pattern the pattern passed to glob()
     * @param  int    $flags   the flags passed to glob()
     * @param  string $path    the path to scan
     * @return mixed  an array of files in the given path matching the pattern.
     */
    protected function rglob($pattern = '*', $flags = 0, $path = '')
    {
        $paths = glob($path . '*', GLOB_MARK | GLOB_ONLYDIR | GLOB_NOSORT);
        $files = glob($path . $pattern, $flags);
        foreach ($paths as $path) {
            $files = array_merge(
                $files, $this->rglob($pattern, $flags, $path)
            );
        }

        return $files;
    }

}
