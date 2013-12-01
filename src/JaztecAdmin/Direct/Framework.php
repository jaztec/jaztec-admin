<?php

namespace JaztecAdmin\Direct;

use JaztecAcl\Direct\AuthorizedDirectObject;

/**
 * Direct class to hold all the framework related functions.
 *
 * @author Jasper van Herpt
 */
class Framework extends AuthorizedDirectObject {

    public function __construct() {
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
     * @param array $values Client side params
     * @return array An array of the allowed controllers to be active.
     */
    public function getControllers(array $values) {
        $config     = $this->getServiceLocator()->get('Config');
        $paths      = $config['jaztec_admin']['modules']['controllers']['paths'];
        $result     = array();
        $controller = '';

        // Loop through the directory's.
        foreach ($paths as $namespace => $path) {
            $readDir = $path . $controllerPath;
            // Opening the directory
            $handle  = opendir($readDir);
            if ($handle) {
                // If exist then read the files for controller names.
                while (false !== ($entry = readdir($handle))) {
                    // Validate the file.
                    $entryPath = $readDir . DIRECTORY_SEPARATOR . $entry;
                    if ($entry !== '.' && $entry !== '..' && is_file($entryPath)) {
                        $entry    = pathinfo($entry);
                        $controller = $namespace . '.' . $entry['filename'];
                        // Validate against the ACL.
                        if ($this->checkAcl('extjs-controller-' . $controller)) {
                            // Return the ExtJS controller string prefixed with the namespace.
                            $result[] = $controller;
                        }
                    }
                }
            }
        }

        return $result;
    }

}
