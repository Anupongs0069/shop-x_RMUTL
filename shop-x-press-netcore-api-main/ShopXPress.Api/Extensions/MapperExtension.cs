using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Loader;
using AutoMapper;
using ShopXPress.Api.Contracts;
using ShopXPress.Api.Contracts.Attributes;

namespace ShopXPress.Api.Extensions;

public static class MapperExtensions
    {
        private static IMapper _mapper;

        public static IMapper CurrentMapper
        {
            get
            {
                if (_mapper == null)
                    CreateMapper();

                return _mapper;
            }
            set
            {
                _mapper = value;
            }
        }


        #region Extension Methods

        /// <summary>
        /// Map the entity to contract
        /// </summary>
        /// <typeparam name="T">Only derived BaseContract are accepted</typeparam>
        /// <param name="modelEntity"></param>
        /// <returns></returns>
        public static T MapToContract<T>(this object modelEntity)
           where T : BaseContract
        {
            EnsureMapperAvailable();
            return _mapper.Map<T>(modelEntity);
        }

        /// <summary>
        /// Map the collection of entity to contract
        /// </summary>
        /// <typeparam name="T">Only derived BaseContract are accepted</typeparam>
        /// <param name="modelEntities"></param>
        /// <returns></returns>
        public static IEnumerable<T> MapToContracts<T>(this IEnumerable<object> modelEntities)
            where T : BaseContract
        {
            EnsureMapperAvailable();
            return modelEntities.Select(m => _mapper.Map<T>(m));
        }

        /// <summary>
        /// Map the contract back to entity with define entoty type.
        /// Note: Try to avoid using this method for the nested object property and collection
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="contract"></param>
        /// <returns></returns>
        public static T MapToEntity<T>(this object contract)
        {
            EnsureMapperAvailable();
            return _mapper.Map<T>(contract);
        }

        /// <summary>
        /// Map contract back to entity with inout  entity.
        /// Note: Try to avoid using this method for the nested object property and collection
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="contract"></param>
        /// <param name="modelEntity"></param>
        /// <returns></returns>
        public static T MapToEntity<T>(this object contract, T modelEntity)
        {
            EnsureMapperAvailable();
            if (contract == null)
                return default;

            return (T)_mapper.Map(contract, modelEntity, contract.GetType(), typeof(T));
        }


        /// <summary>
		/// Project one type to another type within EF query.
		/// <para>Only use this method with EF query only.</para>
		/// </summary>
		/// <typeparam name="TDest"></typeparam>
		/// <param name="modelEntity"></param>
		/// <returns></returns>
        public static IQueryable<TDest> SelectTo<TDest>(this IQueryable modelEntity)
        {
            EnsureMapperAvailable();
            return _mapper.ProjectTo<TDest>(modelEntity);
        }
        #endregion

        #region Private Methods for mapper configurations

        private static void CreateMapper()
        {
            var configuration = LoadDefaultConfiguration();
            _mapper = configuration.CreateMapper();
        }

        private static void EnsureMapperAvailable()
        {
            if (_mapper == null)
                CreateMapper();
        }

        private static MapperConfiguration LoadDefaultConfiguration()
        {
            // Load assembly from ManyBuildSvc.dll
            var contractTypes = LoadTypes(Path.Combine(AppContext.BaseDirectory, "ShopXPress.Api.dll"));

            var config = new MapperConfiguration(cfg =>
            {
                foreach (var cType in contractTypes)
                {
                    // Find all class that has attribute [MapTo] and [MapFrom]
                    var mapToAttr = cType.GetCustomAttributes(typeof(MapToAttribute), false);
                    var mapFromAttr = cType.GetCustomAttributes(typeof(MapFromAttribute), false);

                    if (mapToAttr.Length > 0)
                    {
                        var dType = (mapToAttr[0] as MapToAttribute).TargetType;
                        MappingTo(cfg, cType, dType);
                    }
                    if (mapFromAttr.Length > 0)
                    {
                        var dType = (mapFromAttr[0] as MapFromAttribute).FromType;
                        MappingFrom(cfg, cType, dType);
                    }
                }

                RegisterCustomMapper(cfg);
            });

            return config;
        }

        private static Type[] LoadTypes(string path)
        {
            var assembly = AssemblyLoadContext.Default.LoadFromAssemblyPath(path);
            var types = assembly.GetTypes()
                            .Where(t => !t.IsAbstract && t.IsPublic && t.IsClass).ToArray();
            return types;
        }

        /// <summary>
        /// Bind mapping entity -> contract to mapper configuration
        /// </summary>
        /// <param name="cfg">mapper configuration</param>
        /// <param name="cType">Contract Type</param>
        /// <param name="dType">Entity Type</param>
        private static void MappingFrom(IMapperConfigurationExpression cfg, Type cType, Type dType)
        {
            var ignoredProperties = cType.GetProperties().Where(p => p.GetCustomAttributes(typeof(NotMappedAttribute), false).Any());
            var exp = cfg.CreateMap(dType, cType).IncludeAllDerived();

            // Apply [NotMapped] Attribute
            foreach (var p in ignoredProperties)
            {
                exp = exp.ForMember(p.Name, opt => { opt.Ignore(); });
            }
        }

        /// <summary>
        /// bind mapping contract -> entity to mapper configuration
        /// </summary>
        /// <param name="cfg">mapper configuration</param>
        /// <param name="cType">Contract Type</param>
        /// <param name="dType">Entity Type</param>
        private static void MappingTo(IMapperConfigurationExpression cfg, Type cType, Type dType)
        {
            var primaryKeyPropertyInfo = dType.GetProperties().FirstOrDefault(c => c.GetCustomAttributes(typeof(KeyAttribute), false).Length > 0);
            var ignoredProperties = dType.GetProperties().Where(p => p.GetCustomAttributes(typeof(NotMappedAttribute), false).Any());
            IMappingExpression mappingExpr = null;
            if (primaryKeyPropertyInfo != null)
            {
                var primaryKeyContractPropertyInfo = cType.GetProperty(primaryKeyPropertyInfo.Name);
                // Ignore map in case if PK with possible types, int, long and guid
                mappingExpr = cfg.CreateMap(cType, dType).ForMember(primaryKeyPropertyInfo.Name, opt =>
                {
                    if (primaryKeyPropertyInfo.PropertyType == typeof(int))
                    {
                        opt.Condition(src => (int)primaryKeyContractPropertyInfo.GetValue(src) > 0);
                    }
                    else if (primaryKeyPropertyInfo.PropertyType == typeof(long))
                    {
                        opt.Condition(src => (long)primaryKeyContractPropertyInfo.GetValue(src) > 0);
                    }
                    else if (primaryKeyPropertyInfo.PropertyType == typeof(Guid))
                    {
                        opt.Condition(src => (Guid)primaryKeyContractPropertyInfo.GetValue(src) != Guid.Empty);
                    }
                });
            }
            else
            {
                mappingExpr = cfg.CreateMap(cType, dType);
            }

            // Apply [NotMapped] Attribute
            foreach (var p in ignoredProperties)
            {
                mappingExpr = mappingExpr.ForMember(p.Name, opt => opt.Ignore());
            }
        }

        /// <summary>
        /// For some reasons to add manual mapping we can add the custom mapping here
        /// </summary>
        /// <param name="cfg"></param>
        internal static void RegisterCustomMapper(IMapperConfigurationExpression cfg)
        {

        }

        #endregion
    }
