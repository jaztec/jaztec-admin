<?php

namespace JaztecAdminTest\Direct;

use JaztecAdminTest\Bootstrap;
use JaztecAdmin\Direct\Framework;
use PHPUnit_Framework_TestCase;

/**
 * Testcases for the \JaztecAdmin\Direct\Framework object.
 * @author Jasper van Herpt <jasper.v.herpt@gmail.com>
 */
class FrameworkTest extends PHPUnit_Framework_TestCase
{

    /**
     * @var \JaztecAdmin\Direct\Framework
     */
    protected $directObject;

    /**
     * Setup the testcase.
     */
    protected function setUp()
    {
        \Zend\Console\Console::overrideIsConsole(false);
        // Fetch the EntityManager
        $em = Bootstrap::getServiceManager()->get('doctrine.entitymanager.orm_default');
        // Setup the variables.
        $this->directObject = new Framework();
        $this->directObject->setServiceLocator(Bootstrap::getServiceManager());
        $this->directObject->setEntityManager($em);

        // Add some data to the test database.
        $guestRole = new \JaztecAcl\Entity\Role('guest');
        $coreResource = new \JaztecAcl\Entity\Resource();
        $coreResource->setName('jaztec/core-admin')
            ->setSort(0);
        $directResource = new \JaztecAcl\Entity\Resource();
        $directResource->setName('jaztecadmin/direct/framework')
            ->setParent($coreResource);
        $em->persist($guestRole);
        $em->persist($coreResource);
        $em->persist($directResource);
        $em->flush();
    }

    /**
     * Test if the controllers get loaded fine.
     * @covers \JaztecAdmin\Direct\Framework::getControllers
     */
    public function testGetControllers()
    {
//        $this->assertTrue(is_array($this->directObject->getControllers(array())));
    }

    /**
     * Test if the views are loaded fine.
     * @covers \JaztecAdmin\Direct\Framework::getViews
     */
    public function testGetViews()
    {
        $this->assertTrue(is_array($this->directObject->getViews(array('controller' => 'Test.controllers.Test'))));
    }

    /**
     * Test if the views are loaded fine.
     * @covers \JaztecAdmin\Direct\Framework::getViews
     */
    public function testGetStores()
    {
        $this->assertTrue(is_array($this->directObject->getStores(array('controller' => 'Test.controllers.Test'))));
    }
}