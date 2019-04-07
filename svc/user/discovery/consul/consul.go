package consul

type DiscoveryService struct {}

func (svc *DiscoveryService) RegisterSelf() error {
	return nil
}

func (svc *DiscoveryService) Discover(svcID string) (string, error) {
	return "", nil
}

func (svc *DiscoveryService) HealthCheck() error {
	return nil
}