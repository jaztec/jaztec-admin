<?php

namespace JaztecAdmin\Controller;

use JaztecAcl\Controller\AuthorizedController;
use Zend\View\Model\JsonModel;

class IndexController extends AuthorizedController
{

    /**
     * Fires the ExtJs application.
     *
     * @return \Zend\View\ViewModel
     */
    public function indexAction()
    {
        $this->layout('jaztec-admin/layout');

        $sm        = $this->getServiceLocator();
        $bootstrap = $sm->get('kjsencha.bootstrap');

        return $bootstrap->getViewModel();
    }

    /**
     * Success action for login from. Should be protected via acl options.
     *
     * @return \Zend\View\Model\JsonModel
     */
    public function validateAction()
    {
        return new JsonModel(
            array(
            'success' => true,
            )
        );
    }

}
