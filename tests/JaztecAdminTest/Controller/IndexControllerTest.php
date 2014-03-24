<?php

namespace JaztecAclTest\Controller;

use JaztecAdminTest\Bootstrap;
use JaztecAdmin\Controller\IndexController;
use PHPUnit_Framework_TestCase;
use Zend\Mvc\Router\Http\TreeRouteStack as HttpRouter;
use Zend\Http\PhpEnvironment\Request;
use Zend\Mvc\MvcEvent;
use Zend\Mvc\Router\RouteMatch;

/**
 * Testcases for the JaztecAdmin\Controller\IndexController.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
class IndexControllerTest extends PHPUnit_Framework_TestCase
{

    /**
     * @var \JaztecAcl\Controller\AuthorizedController
     */
    protected $controller;

    /**
     * @var \Zend\Http\Request
     */
    protected $request;

    /**
     * @var \Zend\Http\Response
     */
    protected $response;

    /**
     * @var \Zend\Mvc\Route\RouteMatch
     */
    protected $routeMatch;

    /**
     * @var \Zend\Mvc\MvcEvent
     */
    protected $event;

    /**
     * Setup the testcase.
     */
    protected function setUp()
    {
        \Zend\Console\Console::overrideIsConsole(false);
        // Gather variables
        $serviceManager   = Bootstrap::getServiceManager();
        $this->controller = new IndexController();
        $this->request    = new Request();
        $this->routeMatch = new RouteMatch(array());
        $this->event      = new MvcEvent();
        $config           = $serviceManager->get('Config');
        $routerConfig     = isset($config['router']) ? $config['router'] : array();
        $router           = HttpRouter::factory($routerConfig);

        // Setup the actual testcase.
        $this->event->setRouter($router);
        $this->event->setRouteMatch($this->routeMatch);
        $this->controller->setEvent($this->event);
        $this->controller->setServiceLocator($serviceManager);
    }

    /**
     * Test whether the index controller returns the a valid status
     * @covers \JaztecAdmin\Controller\IndexController::indexAction
     */
    public function testIndexResponse()
    {
        $this->routeMatch->setParam('action', 'index');

        $this->controller->dispatch($this->request);
        $response = $this->controller->getResponse();

        $this->assertEquals(200, $response->getStatusCode());
    }

}
