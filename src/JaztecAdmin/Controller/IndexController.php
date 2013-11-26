<?php

namespace JaztecAdmin\Controller;

use JaztecAcl\Controller\AuthorizedController;
use Zend\View\Model\ViewModel;

class IndexController extends AuthorizedController {

    /**
     * Fires the ExtJs application.
     * 
     * @return \Zend\View\ViewModel
     */
    public function indexAction() {
        $this->layout('jaztec-admin/layout');
        
        $sm = $this->getServiceLocator();
        $bootstrap = $sm->get('kjsencha.bootstrap');
        return $bootstrap->getViewModel();
    }

}
